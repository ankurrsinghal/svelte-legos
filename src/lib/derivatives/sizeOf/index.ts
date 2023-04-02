import { derived, type Readable } from "svelte/store";

export function sizeOf<T>(store: Readable<T>) {
	return derived(store, ($store) => {
		if ($store instanceof Array || typeof $store === "string") {
			return $store.length;
		} else if ($store instanceof Set || $store instanceof Map) {
			return $store.size;
		} else {
			return 0;
		}
	});
}
