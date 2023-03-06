import { isReadable, isSafeIntegerThrowable, tryOnDestroy, unwrapReadable, writableToReadable } from '$lib/shared';
import type { Fn, Pausable } from '$lib/shared/utils/types';
import { readable, writable, type Readable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { useIntervalFn } from '$lib';

/**
 * Wrapper for `setInterval` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useInterval(
	interval: number | Readable<number> | undefined
): Readable<number> {
  if (interval === undefined) {
    interval = 1000;
  }

  let value = 0;

  const counter = readable(value, set => {
    function handler() {
      value++;
      set(value);
    }

    const { pause } = useIntervalFn(handler, interval);

    return pause;
  });

	return counter;
}
