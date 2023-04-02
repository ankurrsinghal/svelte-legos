import { derived, type Readable } from "svelte/store";

export function pick<T>(store: Readable<T>, ...keys: (keyof T)[]) {
	return derived(store, ($store) => {
		if (keys.length === 1) {
			return $store[keys[0]];
		}

		return keys
			.map((key) => [key, $store[key]] as const)
			.reduce((map, pair) => {
				const [key, value] = pair;
				map[key] = value;
				return map;
			}, {} as Partial<T>);
	});
}
