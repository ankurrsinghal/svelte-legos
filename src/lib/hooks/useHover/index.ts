import { useEventListener, useToggle } from "$lib";
import type { Readable } from "svelte/store";

export function useHover<T extends HTMLElement = HTMLElement>(
  ref: T | undefined | null
): Readable<boolean> {
  const { value, on, toggle } = useToggle();

  if (ref && ref !== null) {
    useEventListener("mouseenter", on, ref);
    useEventListener("mouseleave", toggle, ref);
  }

  return value;
}
