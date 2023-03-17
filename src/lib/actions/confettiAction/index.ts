import { eventListenerStore } from "$lib/stores/eventListenerStore";
import confetti from 'canvas-confetti';

interface ConfettiActionParams {
  type: 'simple' | 'school-pride';
  particleCount: number;
  spread: number;
  origin: {
    x: number,
    y: number,
  }
}

const defaultConfettiParams = {
  type: 'simple',
  particleCount: 100,
  spread: 70,
  origin: { y: 0.5, x: 0.5 }
} as ConfettiActionParams;

export function confettiAction<T extends HTMLElement>(
  node: T,
  params: Partial<ConfettiActionParams> = defaultConfettiParams
) {
  let stop: () => void;

  const destroy = () => {
    stop && stop();
  };

  const update = (params: ConfettiActionParams) => {
    destroy();

    async function handleClick() {
      if (params.type === 'simple') {
        confetti(params);
      } else {
        const end = Date.now() + (1 * 1000);
        const colors = ['#bb0000', '#ffffff'];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
    }

    ({ stop } = eventListenerStore("click", handleClick, node));
  };

  update({ ...defaultConfettiParams, ...params });

  return {
    update,
    destroy,
  };
}
