import type { Fn, Stoppable } from '$lib/shared/utils/types';
import { noop } from 'svelte/internal';
import { derived, type Readable } from 'svelte/store';
import { timeoutFnStore, type UseTimeoutFnOptions } from '../timeoutFnStore';

export interface UseTimeoutOptions<Controls extends boolean> extends UseTimeoutFnOptions {
	/**
	 * Expose more controls
	 *
	 * @default false
	 */
	controls?: Controls;
	/**
	 * Callback on timeout
	 */
	callback?: Fn;
}

/**
 * Update value after a given time with controls.
 *
 * @see   {@link https://vueuse.org/useTimeout}
 * @param interval
 * @param options
 */
export function timeoutStore(
	interval?: number,
	options?: UseTimeoutOptions<false>
): Readable<boolean>;
export function timeoutStore(
	internal: number,
	options: UseTimeoutOptions<true>
): { ready: Readable<boolean> } & Stoppable;
export function timeoutStore(internal = 1000, options: UseTimeoutOptions<boolean> = {}) {
	const { controls: exposeControls = false, callback = noop } = options;
	const controls = timeoutFnStore(callback, internal, options);

	const ready = derived(controls.isPending, ($isPending) => !$isPending);

	if (exposeControls) {
		return {
			ready,
			...controls
		};
	} else {
		return ready;
	}
}
