import { defaultDocument } from "$lib/shared";
import { writable } from "svelte/store";

interface CSSVarStoreOptions<T> {
  el?: T;
  initialValue?: string;
}

export function cssVarStore<T extends HTMLElement>(name: string, { el, initialValue }: CSSVarStoreOptions<T> = {}) {
  const target = el || (defaultDocument?.documentElement);
  const store = writable(initialValue);

  function updateCSSVar(value: string) {
    target?.style.setProperty(name, value);
  }

  function set(value: string) {
    updateCSSVar(value);
    store.set(value);
  }

  if (initialValue) {
    updateCSSVar(initialValue);
  }

  return {
    subscribe: store.subscribe,
    set,
  }
}