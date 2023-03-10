import { defaultWindow, tryOnDestroy, writableToReadable } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { writable, type Readable } from "svelte/store";

export function elementVisibilityStore(
  target: Element | null,
  { window = defaultWindow }: ConfigurableWindow = {}
): Readable<boolean> {
  const store = writable(false);
  
  if (target !== null) {
    function check() {
      if (!window) return;
      if (target === null) return;
  
      const document = window.document;
      const rect = target.getBoundingClientRect();
  
      const test = (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
      );
      store.set(test);
    }
  
    window?.addEventListener('scroll', check, { capture: false, passive: true });

    check();
  
    tryOnDestroy(() => {
      window?.removeEventListener('scroll', check);
    });
  }

  return writableToReadable(store);
}
