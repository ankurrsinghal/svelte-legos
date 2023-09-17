import { readable } from "svelte/store";

/**
 * Gets the current date in a Svelte readable store. The date is updated every 10ms.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 *
 *
 * @example
 * ```ts
 * import { dateStore } from 'svelte-legos';
 *
 * $: console.log($dateStore); // Fri Sep 15 2023 11:43:12 GMT+0100 (British Summer Time)
 * ```
 */
export const dateStore = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 10);

  return () => clearInterval(interval);
});
