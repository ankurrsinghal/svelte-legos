import { writableToReadable } from '$lib/shared';
import { writable } from 'svelte/store';

export function useToggle(initialValue = false) {
	const store = writable(initialValue);

	const toggle = () => {
		store.update((value) => !value);
	};
	const on = () => {
		store.set(true);
	};
	const off = () => {
		store.set(false);
	};

	return {
		value: writableToReadable(store),
		toggle,
		on,
		off
	};
}
