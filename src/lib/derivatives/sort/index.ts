import { derived, type Readable } from "svelte/store";

type ComparatorFn<T> = (a: T, b: T) => number;
type SortFn<T> = (arr: T[], compareFn: ComparatorFn<T>) => T[];

function defaultSortFn<T>(source: T[], compareFn: ComparatorFn<T>) {
	return source.sort(compareFn);
}

const defaultCompare: ComparatorFn<number> = (a: number, b: number) => {
	return a - b;
};

interface SortParams<T> {
	sortFn?: SortFn<T>;
	compareFn?: ComparatorFn<T>;
}

export function sort<T>(store: Readable<T[]>, params: SortParams<T> = {}) {
	const { sortFn = defaultSortFn, compareFn = defaultCompare } = params;

	return derived(store, ($store) => {
		if (!($store instanceof Array)) {
			throw new Error("Store must be an instance of Array");
		}

		return sortFn($store.slice(), compareFn);
	});
}
