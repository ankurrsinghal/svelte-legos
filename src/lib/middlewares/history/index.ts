import { derived, get, writable, type Updater, type Writable } from "svelte/store";

export function history<T>(store: Writable<T>) {
	let past = writable<T[]>([]);
	let future = writable<T[]>([]);
	let present: T = get(store);

	function undo() {
		if (get(past).length === 0) return;
		future.update(($future) => [present, ...$future]);
		const pasts = get(past);
		present = pasts.pop()!;
		past.set([...pasts]);

		store.set(present);
	}

	function redo() {
		if (get(future).length === 0) return;
		past.update(($past) => [...$past, present]);

		const futures = get(future);
		present = futures.shift()!;
		future.set([...futures]);

		store.set(present);
	}

	function updateHistory(value: T) {
		if (present === value) return;
		past.update(($past) => [...$past, present]);
		present = value;
		future.set([]);
	}

	function set(value: T) {
		updateHistory(value);
		store.set(value);
	}

	function update(fn: Updater<T>) {
		const value = fn(get(store));
		updateHistory(value);
		store.update(fn);
	}

	return {
		subscribe: store.subscribe,
		set,
		update,
		history: {
			undo,
			redo,
			canUndo: derived(past, ($past) => $past.length !== 0),
			canRedo: derived(future, ($future) => $future.length !== 0),
		},
	};
}
