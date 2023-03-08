import { tryOnDestroy } from "$lib/shared";
import type { Readable, Subscriber } from "svelte/store";

export function useReadable<T>(readable: Readable<T>, handler: (value: T) => void) {
  const unsub = readable.subscribe(handler);

  tryOnDestroy(unsub);

  return unsub;
}
