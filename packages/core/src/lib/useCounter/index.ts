import { writable, type Readable } from 'svelte/store';

export interface UseCounterOptions {
	counter: Readable<number>;
	inc: (n?: number) => void;
	dec: (n?: number) => void;
	set: (n: number) => void;
	reset: () => void;
}

export function useCounter(initialValue = 0): UseCounterOptions {
	const store = writable(initialValue);

	const inc = (incrementBy = 1) => {
		store.update((counter) => counter + incrementBy);
	};
	const dec = (decrementBy = 1) => {
		store.update((counter) => counter - decrementBy);
	};
	const set = (value: number) => {
		store.set(value);
	};
	const reset = () => {
		store.set(initialValue);
	};

	return {
		counter: { subscribe: store.subscribe },
		inc,
		dec,
		set,
		reset
	};
}
