import { derived, type Readable } from "svelte/store";

export function pickArray<T>(store: Readable<T[]>, ...keys: (keyof T)[]) {
	return derived(store, ($store) => {
		return $store.map((value) => {
			if (keys.length === 1) {
				return value[keys[0]];
			}

			return keys
				.map((key) => [key, value[key]] as const)
				.reduce((map, pair) => {
					const [key, value] = pair;
					map[key] = value;
					return map;
				}, {} as Partial<T>);
		});
	});
}
