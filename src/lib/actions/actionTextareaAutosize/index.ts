import { useEventListener } from "$lib";
import ProxyTextareaElement from "./core";

export function actionTextareaAutosize(node: HTMLTextAreaElement) {
  
  function init() {
    const isTextarea = node instanceof HTMLTextAreaElement;
    if (!isTextarea) return;

    const proxy = new ProxyTextareaElement();

    proxy.start(node);

    function handleChange() {
      proxy.onUpdateText(node.value);
    }

    const { stop } = useEventListener('input', handleChange, node);

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
