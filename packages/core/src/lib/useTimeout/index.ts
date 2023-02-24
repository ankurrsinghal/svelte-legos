import { readable } from "svelte/store";

export function useTimeout(time = 1000) {
  const ready = readable(false, (set) => {
    const timerId = setTimeout(() => {
      set(true);
    }, time);

    return () => {
      clearTimeout(timerId);
    };
  });

  return ready;
}
