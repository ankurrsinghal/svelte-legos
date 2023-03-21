import { readable } from "svelte/store";
import { intervalFnStore } from "../intervalFnStore";

/**
 * Performance.memory
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory
 */
export interface MemoryInfo {
	/**
	 * The maximum size of the heap, in bytes, that is available to the context.
	 */
	readonly jsHeapSizeLimit: number;
	/**
	 *  The total allocated heap size, in bytes.
	 */
	readonly totalJSHeapSize: number;
	/**
	 * The currently active segment of JS heap, in bytes.
	 */
	readonly usedJSHeapSize: number;

	[Symbol.toStringTag]: "MemoryInfo";
}

type PerformanceMemory = Performance & {
	memory: MemoryInfo;
};

export function memoryStore() {
	let memory: MemoryInfo | undefined = undefined;
	const isSupported = typeof performance !== "undefined" && "memory" in performance;

	if (isSupported) {
		memory = (performance as PerformanceMemory).memory;
	}

	return readable({ isSupported, memory }, (set) => {
		let stop = () => {};

		if (isSupported) {
			const { pause } = intervalFnStore(() => {
				memory = (performance as PerformanceMemory).memory;
				set({ isSupported, memory });
				stop = pause;
			}, 1000);
		}

		return stop;
	});
}
