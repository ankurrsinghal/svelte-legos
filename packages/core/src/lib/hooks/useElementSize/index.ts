import { defaultWindow } from '$lib/shared';
import type { ConfigurableWindow } from '$lib/shared/utils/types';
import { readable, type Readable } from 'svelte/store';

function isElementVisible(element: Element, window: Window): boolean {
	const rect = element.getBoundingClientRect();
	return (
		rect.top <= window.innerHeight &&
		rect.left <= window.innerWidth &&
		rect.bottom >= 0 &&
		rect.right >= 0
	);
}

export function useElementVisibility(
	target: Element,
	options: ConfigurableWindow = {}
): Readable<boolean> {
	const { window = defaultWindow } = options;

	const visibility = readable(window ? isElementVisible(target, window) : false, (set) => {
		function handler() {
      if (!window) return;
			set(isElementVisible(target, window));
		}

		if (window) {
			window.addEventListener('scroll', handler);

			return () => {
				window.removeEventListener('scroll', handler);
			};
		}
	});

	return visibility;
}
