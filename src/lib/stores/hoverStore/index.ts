import type { Readable } from "svelte/store";
import { eventListenerStore } from "../eventListenerStore";
import { toggleStore } from "../toggleStore";

export function hoverStore<T extends HTMLElement = HTMLElement>(
  ref: T | undefined | null
): Readable<boolean> {
  const { value, on, toggle } = toggleStore();

  if (ref && ref !== null) {
    eventListenerStore("mouseenter", on, ref);
    eventListenerStore("mouseleave", toggle, ref);
  }

  return value;
}
