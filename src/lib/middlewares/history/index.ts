import { get, type Updater, type Writable } from "svelte/store";

export function history<T>(writable: Writable<T>) {
	let past: T[] = [];
	let future: T[] = [];
	let present: T = get(writable);

	function undo() {
		if (past.length === 0) return;
		future.unshift(present);
		present = past.pop()!;
		writable.set(present);
	}

	function redo() {
		if (future.length === 0) return;
		past.push(present);
		present = future.shift()!;
		writable.set(present);
	}

	function updateHistory(value: T) {
		if (present === value) return;
		past.push(present);
		present = value;
		future = [];
	}

	function set(value: T) {
		updateHistory(value);
		writable.set(value);
	}

	function update(fn: Updater<T>) {
		const value = fn(get(writable));
		updateHistory(value);
		writable.update(fn);
	}

	return {
		subscribe: writable.subscribe,
		set,
		update,
		history: {
			undo,
			redo,
		},
	};
}
