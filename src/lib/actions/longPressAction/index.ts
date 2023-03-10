import { timeoutFnStore } from "$lib";

export function longPressAction<T extends Element>(node: T, duration = 500) {
  function handleTimeout() {
    node.dispatchEvent(new CustomEvent("longpress"));
  }

  const { start, stop, changeDuration } = timeoutFnStore(handleTimeout, duration, { immediate: false });

  const handleMousedown = () => {
    start();
  };

  const handleMouseup = () => {
    stop();
  };

  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("mouseup", handleMouseup);

  return {
    update(newDuration: number) {
      changeDuration(newDuration);
    },
    destroy() {
      console.log("destroy");
      stop();
      node.removeEventListener("mousedown", handleMousedown);
      node.removeEventListener("mouseup", handleMouseup);
    },
  };
}
