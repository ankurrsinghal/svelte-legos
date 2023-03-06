import { writableToReadable } from "$lib/shared";
import { writable, type Readable } from "svelte/store";
import { useResizeObserver } from "../useResizeObserver";

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
export function useElementBounding<T extends Element>(
  target: T,
): Readable<DOMRect> {
  const size = writable<DOMRect>(getBounding(target));
  useResizeObserver(
    target,
    () => {
      size.set(getBounding(target));
    },
  )

  return writableToReadable(size);
}
