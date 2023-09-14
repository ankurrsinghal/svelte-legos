import { onNavigate } from "$app/navigation";

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
