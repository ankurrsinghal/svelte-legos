import { tryOnDestroy } from "$lib/shared";
import type { Readable } from "svelte/store";

export function readableStore<T>(readable: Readable<T>, handler: (value: T) => void) {
	const unsub = readable.subscribe(handler);

	tryOnDestroy(unsub);

	return unsub;
}
