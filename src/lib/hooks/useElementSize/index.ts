import { defaultWindow, writableToReadable } from "$lib/shared";
import type { Size } from "$lib/shared/utils/types";
import { writable } from "svelte/store";
import { useResizeObserver } from "../useResizeObserver";

/**
 * Reactive size of an HTML element.
 *
 * @param target
 * @param callback
 * @param options
 */
export function useElementSize<T extends Element | null>(
  target: T,
) {
  const size = writable<Size>({ width: 0, height: 0 });
  if (target !== null) {
    useResizeObserver(
      target,
      ([entry]) => {
        size.set({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      },
    ) 
  }

  return writableToReadable(size);
}
