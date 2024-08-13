import { type Readable } from "svelte/store";

export function isUndefined<T>(value: T) {
	return value === undefined;
}

export interface SingletonPromiseReturn<T> {
	(): Promise<T>;
	/**
	 * Reset current staled promise.
	 * await it to have proper shutdown.
	 */
	reset: () => Promise<void>;
}

/**
 * Create singleton promise function
 *
 * @example
 * ```
 * const promise = createSingletonPromise(async () => { ... })
 *
 * await promise()
 * await promise() // all of them will be bind to a single promise instance
 * await promise() // and be resolved together
 * ```
 */
export function createSingletonPromise<T>(fn: () => Promise<T>): SingletonPromiseReturn<T> {
	let _promise: Promise<T> | undefined;

	function wrapper() {
		if (!_promise) _promise = fn();
		return _promise;
	}
	wrapper.reset = async () => {
		const _prev = _promise;
		_promise = undefined;
		if (_prev) await _prev;
	};

	return wrapper;
}
