import { defaultWindow, tryOnDestroy, writableToReadable } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { writable, type Readable } from "svelte/store";

export function elementVisibilityStore(
  target: Element | null,
  { window = defaultWindow }: ConfigurableWindow = {}
) {
  const store = writable(false);

  function stop() {
    window?.removeEventListener('scroll', check);
  }

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

  function start() {
    stop();
    window?.addEventListener('scroll', check, { capture: false, passive: true });
    check();
  }

  start();
  
  tryOnDestroy(stop);

  return { isVisible: writableToReadable(store), stop };
}
