import { hoverStore } from "$lib/stores/hoverStore";
import type { Unsubscriber } from "svelte/store";

function CreateHoverEvent(hover: boolean) {
  return new CustomEvent("hover", { detail: { hover } });
}

export function hoverAction<T extends HTMLElement>(node: T) {
  const hover = hoverStore(node);

  let unsub: Unsubscriber | null = null;

  function stop() {
    if (unsub !== null) {
      unsub();
    }
  }

  function start() {
    stop();
    unsub = hover.subscribe((hover) => {
      node.dispatchEvent(CreateHoverEvent(hover));
    });
  }

  start();

  return {
    destroy: stop,
  };
}
