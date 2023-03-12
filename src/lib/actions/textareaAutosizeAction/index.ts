import { eventListenerStore } from "$lib/stores/eventListenerStore";
import ProxyTextareaElement from "./core";

export function textareaAutosizeAction(node: HTMLTextAreaElement) {
  
  function init() {
    const isTextarea = node instanceof HTMLTextAreaElement;
    if (!isTextarea) return;

    const proxy = new ProxyTextareaElement();

    proxy.start(node);

    function handleChange() {
      proxy.onUpdateText(node.value);
    }

    const { stop } = eventListenerStore('input', handleChange, node);

    function cleanUp() {
      proxy.cleanUp();
      stop();
    }

    // initialize
    handleChange();

    return cleanUp;
  }

  const stop = init();

  return {
    destroy() {
      stop && stop();
    },
  };
}
