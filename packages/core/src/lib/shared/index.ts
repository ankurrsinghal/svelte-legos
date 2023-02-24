import { get_current_component, onDestroy } from "svelte/internal";

export function tryOnDestroy(fn: () => void) {
  try {
    get_current_component();
    onDestroy(fn);
  } catch {
    // fail silently
  } 
}