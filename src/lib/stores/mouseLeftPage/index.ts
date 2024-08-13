import { defaultWindow } from "$lib/shared";
import { readable, type Readable } from "svelte/store";
import { listen } from "svelte/internal";

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
			const _stop = listen(window, "mouseout", handler as () => void);
			const __stop = listen(window.document, "mouseleave", handler as () => void);
			const ___stop = listen(window.document, "mouseenter", handler as () => void);

			return () => {
				_stop && _stop();
				__stop && __stop();
				___stop && ___stop();
			};
		}
	});

	return position;
}
