import { writable } from "svelte/store";

export interface UseCounterOptions {
	min?: number;
	max?: number;
}

export function counterStore(initialValue = 0, options: UseCounterOptions = {}) {
	const store = writable(initialValue);

	const { min = -Infinity, max = Infinity } = options;

	const inc = (incrementBy = 1) => {
		store.update((counter) => Math.min(max, counter + incrementBy));
	};
	const dec = (decrementBy = 1) => {
		store.update((counter) => Math.max(min, counter - decrementBy));
	};
	const set = (value: number) => {
		store.set(Math.min(max, Math.max(min, value)));
	};
	const reset = () => {
		set(initialValue);
	};

	return {
		counter: { subscribe: store.subscribe },
		inc,
		dec,
		set,
		reset,
	};
}
