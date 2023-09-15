import { onNavigate } from "$app/navigation";

/**
 * Starts the view transition API inside SvelteKit.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 *
 *
 * @example
 * ```ts
 * import { startViewTransition } from 'svelte-legos';
 *
 * startViewTransition();
 * ```
 */
export function startViewTransition() {
  onNavigate(({ complete }) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await complete;
      });
    });
  });
}
