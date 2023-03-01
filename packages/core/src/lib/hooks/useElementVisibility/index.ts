import type { Size } from '$lib/shared/utils/types';
import { useResizeObserver } from '$lib/useResizeObserver';
import { readable, type Readable } from 'svelte/store';

function getElementSize(rect: DOMRect): Size {
	return {
		width: rect.width,
		height: rect.height
	};
}

export function useElementSize(target: Element): Readable<Size> {
	const size = readable(getElementSize(target.getBoundingClientRect()), (set) => {
		function handler([entry]: ResizeObserverEntry[]) {
			set(getElementSize(entry.contentRect));
		}

		const { stop } = useResizeObserver(target, handler);

		return stop();
	});

	return size;
}
