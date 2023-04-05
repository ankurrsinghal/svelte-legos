import { derived, type Readable } from "svelte/store";

function isIterable(obj: any) {
	// checks for null and undefined
	if (obj == null) {
		return false;
	}
	return typeof obj[Symbol.iterator] === "function";
}

export function first<P, T extends Iterable<P>>(store: Readable<Iterable<P>>) {
	return derived(store, ($store) => {
		if (!isIterable($store)) {
			throw new Error("store data is not iterable");
		}

		if ($store instanceof Array) {
			return $store[0];
		}

		if ($store instanceof Set) {
			return $store.values().next().value;
		}

		if ($store instanceof Map) {
			return $store.entries().next().value;
		}
	});
}
