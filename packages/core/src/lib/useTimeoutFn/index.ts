import type { Fn, Stoppable } from '$lib/shared/utils/types';
import { writable } from 'svelte/store';

export type UseTimeoutFnProps = {
	/**
	 * Start the timer immediate after calling this function
	 *
	 * @default true
	 */
	immediate?: boolean;
};

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn(
	fn: Fn,
	interval = 1000,
	options: UseTimeoutFnProps = { immediate: true }
): Stoppable {
	const { immediate } = options;
	const { set, subscribe } = writable(false);

	let timerId: ReturnType<typeof setTimeout> | null = null;

	function stop() {
		if (timerId !== null) {
			clearTimeout(timerId);
			timerId = null;
		}
	}

	function start() {
		stop();
		set(true);
		timerId = setTimeout(() => {
			set(false);
			timerId = null;
			fn();
		}, interval);
	}

	if (immediate) {
		start();
	}

	return {
		isPending: { subscribe },
		stop,
		start
	};
}
