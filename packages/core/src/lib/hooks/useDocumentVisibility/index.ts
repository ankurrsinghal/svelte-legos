import { defaultDocument } from '$lib/shared';
import type { ConfigurableDocument } from '$lib/shared/utils/types';
import { readable, type Readable } from 'svelte/store';


function getCurrentDocumentVisibility(document = defaultDocument): DocumentVisibilityState {
	if (!document) return 'visible';

	return document.visibilityState;
}

export function useDocumentVisibility({
	document = defaultDocument
}: ConfigurableDocument = {}): Readable<DocumentVisibilityState> {
	const visibility = readable(getCurrentDocumentVisibility(document), (set) => {
		function handler() {
			set(getCurrentDocumentVisibility());
		}

		if (document) {
			document.addEventListener('visibilitychange', handler);

			return () => {
				document.removeEventListener('visibilitychange', handler);
			};
		}
	});

	return visibility;
}
