import { isReadable, isSafeIntegerThrowable, tryOnDestroy, unwrapReadable, writableToReadable } from '$lib/shared';
import type { Fn, Pausable } from '$lib/shared/utils/types';
import { writable, type Readable } from 'svelte/store';
import type { Writable } from 'svelte/store';

/**
 * Wrapper for `setInterval` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function intervalFnStore(
	fn: Fn,
	interval: number | Readable<number> | undefined
): Pausable {

  if (interval === undefined) {
    interval = 1000;
  }

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
    const intervalValue = unwrapReadable(interval);

    isSafeIntegerThrowable(intervalValue);

		isActiveWritable.set(true);
		clean();
		timerId = setInterval(fn, intervalValue);
	}

	function changeIntervalTime(newInterval: number) {
		interval = newInterval;
		resume();
	}

	if (isReadable(interval)) {
		const unsub = (interval as Writable<number>).subscribe(() => {
			resume();
		});

		tryOnDestroy(unsub);
	} else {
    resume();
  }

	tryOnDestroy(pause);

	return {
		isActive: writableToReadable(isActiveWritable),
		resume,
		pause,
		changeIntervalTime
	};
}
