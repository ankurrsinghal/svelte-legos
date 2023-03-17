import { eventListenerStore } from "$lib/stores/eventListenerStore";
import confetti from 'canvas-confetti';

interface ConfettiActionParams {
  particleCount: number;
  spread: number;
  origin: {
    x: number,
    y: number,
  }
}

const defaultConfettiParams = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.5, x: 0.5 }
}

export function confettiAction<T extends HTMLElement>(
  node: T,
  confettiParams: ConfettiActionParams = defaultConfettiParams
) {
  let stop: () => void;

  const destroy = () => {
    stop && stop();
  };

  const update = () => {
    destroy();

    async function handleClick() {
      confetti(confettiParams);
    }

    ({ stop } = eventListenerStore("click", handleClick, node));
  };

  update();

  return {
    update,
    destroy,
  };
}
