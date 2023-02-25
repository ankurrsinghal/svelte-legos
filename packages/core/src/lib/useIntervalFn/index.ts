import { isSafeIntegerThrowable, isWritable, tryOnDestroy, unwrapWritable, writableToReadable } from '$lib/shared';
import type { Fn, Pausable } from '$lib/shared/utils/types';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface UseIntervalFnOptions {
	/**
	 * Start the timer immediate after calling this function
	 *
	 * @default true
	 */
	immediate?: boolean;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(
	fn: Fn,
	interval: number | Writable<number> = 1000,
	options: UseIntervalFnOptions = {}
): Pausable {
	const { immediate = true } = options;
	const isActiveWritable = writable(false);

	let timerId: ReturnType<typeof setInterval> | null = null;

	function clean() {
		if (timerId !== null) {
			clearInterval(timerId);
			timerId = null;
		}
	}

	function pause() {
		isActiveWritable.set(false);
		clean();
	}

	function resume() {
    const intervalValue = unwrapWritable(interval);

    isSafeIntegerThrowable(intervalValue);

		isActiveWritable.set(true);
		clean();
		timerId = setInterval(fn, unwrapWritable(interval));
	}

	function changeIntervalTime(newInterval: number) {
		interval = newInterval;
		resume();
	}

	if (isWritable(interval)) {
		const unsub = (interval as Writable<number>).subscribe(() => {
			resume();
		});

		tryOnDestroy(unsub);
	}

	if (immediate) resume();

	tryOnDestroy(pause);

	return {
		isActive: writableToReadable(isActiveWritable),
		resume,
		pause,
		changeIntervalTime
	};
}
