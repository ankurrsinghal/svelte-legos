import { writable } from "svelte/store";

type ReducerAction = any;

type ReducerFunction<T> = (state: T, action: ReducerAction) => T;

export function reduceable<T>(reducerFunction: ReducerFunction<T>, initialState: T) {
	const { subscribe, update } = writable(initialState);

	function dispatch(action: ReducerAction) {
		update((state) => reducerFunction(state, action));
	}

	return {
		subscribe,
		dispatch,
	};
}
