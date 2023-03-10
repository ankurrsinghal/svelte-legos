import { tryOnDestroy } from '$lib/shared';

export function resizeObserverStore(
	target: Element,
	callback: (entries: ResizeObserverEntry[]) => void
) {
	let observer: ResizeObserver | null = null;

	function cleanUp() {
		if (observer !== null) {
			observer.disconnect();
			observer = null;
		}
	}

	function connect() {
		cleanUp();
		observer = new ResizeObserver(callback);
		observer.observe(target);
	}

	function stop() {
		cleanUp();
	}

	tryOnDestroy(cleanUp);

	connect();

	return {
		stop
	};
}
