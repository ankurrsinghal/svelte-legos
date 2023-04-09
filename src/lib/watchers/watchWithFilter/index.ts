import { tryOnDestroy } from "$lib/shared";
import type { Readable } from "svelte/store";

type CallbackFunction<T> = (newValue: T, oldVal: T) => void;
type PredicateFunction<T> = (value: T) => boolean;

interface WatcherParams {
	immediate?: boolean;
}

export function watchWithFilter<T>(
	store: Readable<T>,
	predicateFn: PredicateFunction<T>,
	callback: CallbackFunction<T>,
	params: WatcherParams = {}
) {
	const { immediate = false } = params;
	let times = 0;
	let oldVal: T;
	const unsub = store.subscribe((value) => {
		if (immediate && times === 0) {
			predicateFn(value) && callback(value, oldVal);
		} else if (times > 0) {
			predicateFn(value) && callback(value, oldVal);
		}
		oldVal = value;
		times++;
	});

	tryOnDestroy(unsub);
}
