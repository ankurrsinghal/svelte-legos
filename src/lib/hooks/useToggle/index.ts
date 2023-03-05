import { writableToReadable } from '$lib/shared';
import { writable } from 'svelte/store';

export function useToggle(initialValue = false) {
	const store = writable(initialValue);

	const toggle = () => {
		store.update((value) => !value);
	};
	const set = (value: boolean) => {
		store.set(value);
	}
	const on = () => {
		set(true);
	};
	const off = () => {
		set(false);
	};

	return {
		value: writableToReadable(store),
		toggle,
		on,
		off
	};
}
