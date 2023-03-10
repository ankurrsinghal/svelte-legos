import { writableToReadable } from "$lib/shared";
import { writable, type Readable } from "svelte/store";
import { resizeObserverStore } from "$lib";

function getBounding(target: Element) {
  return target.getBoundingClientRect();
}

/**
 * Reactive size of an HTML element.
 *
 * @param target
 * @param callback
 * @param options
 */
export function elementBoundingStore<T extends Element>(
  target: T,
): Readable<DOMRect> {
  const size = writable<DOMRect>(getBounding(target));
  resizeObserverStore(
    target,
    () => {
      size.set(getBounding(target));
    },
  )

  return writableToReadable(size);
}
