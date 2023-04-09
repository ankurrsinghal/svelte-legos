import { tryOnDestroy } from "$lib/shared";
import type { Readable } from "svelte/store";

type CallbackFunction<T> = (newValue: T, oldVal: T) => void;

export function watchOnce<T>(store: Readable<T>, callback: CallbackFunction<T>) {
	let isStopped = false;
	let times = 0;
	let oldVal: T;
	const unsub = store.subscribe((value) => {
		if (times === 1) {
			callback(value, oldVal);
			isStopped = true;
			unsub();
		}
		oldVal = value;
		times++;
	});

	tryOnDestroy(() => {
		if (!isStopped) unsub();
	});
}
