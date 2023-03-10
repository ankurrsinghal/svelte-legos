import { defaultWindow } from '$lib/shared';
import type { ConfigurableWindow } from '$lib/shared/utils/types';
import { readable, type Readable } from 'svelte/store';

function isCurrentWindowFocused(window = defaultWindow): boolean {
	if (!window) return false;
	if (!window.document) return false;
	if (typeof window.document.hasFocus !== 'function') return false;

	return window.document.hasFocus();
}

export function windowFocusStore({ window = defaultWindow }: ConfigurableWindow = {}): Readable<boolean> {
	const visibility = readable(isCurrentWindowFocused(), (set) => {
		function handler() {
			set(isCurrentWindowFocused());
		}

		if (window) {
			window.addEventListener('focus', handler);
			window.addEventListener('blur', handler);

			return () => {
				window.removeEventListener('focus', handler);
				window.removeEventListener('blur', handler);
			};
		}
	});

	return visibility;
}
