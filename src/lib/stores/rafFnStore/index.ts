import {
  defaultWindow,
  tryOnDestroy,
} from "$lib/shared";
import type { ConfigurableWindow, Fn, Pausable } from "$lib/shared/utils/types";

/**
 * Wrapper for `requestAnimationFrame` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function rafFnStore(
  fn: Fn,
  { window = defaultWindow }: ConfigurableWindow = {}
) {
  let timerId: ReturnType<typeof requestAnimationFrame> | undefined = undefined;

  function clean() {
    if (timerId) {
      window?.cancelAnimationFrame(timerId);
      timerId = undefined;
    }
  }

  function pause() {
    clean();
  }

  function loop() {
    console.log("looping");
    if (timerId) {
      fn();
      timerId = window?.requestAnimationFrame(loop);
    }
  }

  function resume() {
    clean();
    timerId = window?.requestAnimationFrame(loop);
  }

  tryOnDestroy(pause);
  resume();

  return {
    resume,
    pause,
  };
}
