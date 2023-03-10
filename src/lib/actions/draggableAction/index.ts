import { eventListenerStore } from "$lib/stores/eventListenerStore";

export function draggableAction<T extends HTMLElement>(node: T) {

  let x = 0, y = 0, isDragging = false;

  function handlePointerDown(e: PointerEvent) {
    if (e.buttons === 2) return;
    node.style.setProperty('cursor', 'move');
    node.setPointerCapture(e.pointerId);
    isDragging = true;
  }

  function handlePointerMove(e: PointerEvent) {
    if (isDragging) {
      x += e.movementX;
      y += e.movementY;
      node.style.setProperty('transform', `translate(${x}px, ${y}px)`);
    }
  }

  function handlePointerUp(e: PointerEvent) {
    node.releasePointerCapture(e.pointerId);
    isDragging = false;

    node.removeEventListener('pointermove', handlePointerMove);
  }

  const { stop: stopPointerDown } = eventListenerStore('pointerdown', handlePointerDown, node);
  const { stop: stopPointerMove } = eventListenerStore('pointermove', handlePointerMove, node);
  const { stop: stopPointerUp } = eventListenerStore('pointerup', handlePointerUp, node);

  return {
    destroy() {
      stopPointerDown();
      stopPointerMove();
      stopPointerUp();
    },
  };
}
