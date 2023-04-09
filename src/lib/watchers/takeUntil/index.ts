import { derived, type Readable } from "svelte/store";

type PredicateFunction<T> = (value: T) => boolean;

export function takeUntil<T>(store: Readable<T>, predicate: PredicateFunction<T> | boolean) {
	return derived(store, ($store, set) => {
		if (typeof predicate === "function") {
			if (!predicate($store)) {
				set($store);
			}
		} else {
			if (!predicate) {
				set($store);
			}
		}
	});
}
