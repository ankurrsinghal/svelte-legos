import { eventListenerStore } from "$lib/stores/eventListenerStore";

export interface EyeDropperOpenOptions {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal?: AbortSignal;
}

export interface EyeDropper {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (): EyeDropper;
  open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>;
  [Symbol.toStringTag]: "EyeDropper";
}

interface EyeDropperActionParams {
  onDone: (color: string) => void;
  onError?: (e: Error) => void;
}

export function eyeDropperAction<T extends HTMLElement>(
  node: T,
  {
    onDone,
    onError,
  }: EyeDropperActionParams
) {
  let stop: () => void;

  const destroy = () => {
    stop && stop();
  };

  const update = () => {
    destroy();
    const isSupported = () =>
      typeof window !== "undefined" && "EyeDropper" in window;

    async function handleClick() {
      if (!isSupported) {
        console.warn("Eyedropeer is not supported");
        return;
      }
      const eyeDropper: EyeDropper = new (window as any).EyeDropper();
      eyeDropper
        .open()
        .then((result) => {
          onDone(result.sRGBHex);
        })
        .catch(onError);
    }

    ({ stop } = eventListenerStore("click", handleClick, node));
  };

  update();

  return {
    update,
    destroy,
  };
}
