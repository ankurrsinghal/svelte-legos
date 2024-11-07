import { defaultWindow } from "$lib/shared";
import { readable, type Readable } from "svelte/store";

export function mouseLeftPage(): Readable<boolean> {
	const window = defaultWindow;

	const position = readable(false, (set) => {
		function handler(event: MouseEvent) {
			if (!window) return;

			event = event || (window.event as any);
			// @ts-expect-error missing types
			const from = event.relatedTarget || event.toElement;
			set(!from);
		}

		if (window) {
			window.addEventListener("mouseout", handler as () => void);
			window.document.addEventListener("mouseleave", handler as () => void);
			window.document.addEventListener("mouseenter", handler as () => void);

			return () => {
				window.removeEventListener("mouseout", handler as () => void);
				window.document.removeEventListener("mouseleave", handler as () => void);
				window.document.removeEventListener("mouseenter", handler as () => void);
			};
		}
	});

	return position;
}
