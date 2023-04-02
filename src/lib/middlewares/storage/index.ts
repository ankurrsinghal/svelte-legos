import { isClient } from "$lib/shared";
import { derived, get, writable, type Updater, type Writable } from "svelte/store";

export function storage<T>(store: Writable<T>, key: string) {
	if (!key || typeof key !== "string" || key.trim() === "") {
		console.warn("Local storage key not provided or invalid!");
	}

	function loadFromStorage() {
		if (isClient) {
			let valueStr;
			try {
				valueStr = localStorage.getItem(key);
				if (valueStr !== null) {
					const json = JSON.parse(valueStr);
					store.set(json);
				}
			} catch (e) {
				if (valueStr === "") {
					store.set("");
				}
				// probably it was a primitive
				else {
					if (valueStr === "false" || valueStr === "true") {
						// boolean state
						store.set(valueStr === "false" ? false : true);
					} else if (!Number.isNaN(Number(valueStr))) {
						store.set(Number(valueStr));
					} else {
						store.set(valueStr);
					}
				}
			}
		}
	}

	function saveToStorage(value: T) {
		if (isClient) {
			if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
				localStorage.setItem(key, value.toString());
			} else if (typeof value === "object") {
				localStorage.setItem(key, JSON.stringify(value));
			}
		}
	}

	function set(value: T) {
		saveToStorage(value);
		store.set(value);
	}

	function update(fn: Updater<T>) {
		const value = fn(get(store));
		saveToStorage(value);
		store.update(fn);
	}

	loadFromStorage();

	return {
		subscribe: store.subscribe,
		set,
		update,
	};
}
