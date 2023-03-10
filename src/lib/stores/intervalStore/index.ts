import { readable, type Readable } from 'svelte/store';
import { intervalFnStore } from '$lib';

/**
 * Wrapper for `setInterval` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function intervalStore(
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

    const { pause } = intervalFnStore(handler, interval);

    return pause;
  });

	return counter;
}
