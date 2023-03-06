import { defaultDocument, defaultWindow, writableToReadable } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { readable, type Readable } from "svelte/store";

function getCurrentActiveElement(window = defaultWindow): Element | null {
  if (!window) return null;
  if (!window.document) return null;

  return window.document.activeElement;
}

export function useActiveElement({
  window = defaultWindow,
}: ConfigurableWindow = {}): Readable<Element | null> {
  const activeElement = readable(getCurrentActiveElement(), (set) => {
    function handler() {
      set(document.activeElement);
    }

    if (window) {
      window.document.addEventListener("focus", handler, true);
      window.document.addEventListener("blur", handler, true);

      return () => {
        window.document.removeEventListener("focus", handler);
        window.document.removeEventListener("blur", handler);
      };
    }
  });

  return activeElement;
}
