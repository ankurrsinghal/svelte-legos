import type { Fn, Stoppable } from '$lib/shared/utils/types';
import { useTimeoutFn, type UseTimeoutFnOptions } from '$lib/useTimeoutFn';
import { noop } from 'svelte/internal';
import { derived, type Readable } from 'svelte/store';

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
export function useTimeout(
	interval?: number,
	options?: UseTimeoutOptions<false>
): Readable<boolean>;
export function useTimeout(
	internal: number,
	options: UseTimeoutOptions<true>
): { ready: Readable<boolean> } & Stoppable;
export function useTimeout(internal = 1000, options: UseTimeoutOptions<boolean> = {}) {
	const { controls: exposeControls = false, callback = noop } = options;
	const controls = useTimeoutFn(callback, internal, options);

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
