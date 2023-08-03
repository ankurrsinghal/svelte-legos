import { readable, type Readable } from "svelte/store";
import { is_client, listen } from "svelte/internal";
import type { ConfigurableWindow, Position } from "$lib/shared/utils/types";

const defaultWindow = is_client ? window : undefined;

export interface UseMouseOptions extends ConfigurableWindow {
	/**
	 * Initial values
	 */
	initialValue?: Position;
}

const initialValue = {
	x: 0,
	y: 0,
};

function getCurrentPointerPosition(e?: MouseEvent): Position {
	if (!e) return initialValue;

	return {
		x: e.pageX,
		y: e.pageY,
	};
}

export function pointerStore(options: UseMouseOptions = {}): Readable<Position> {
	const { window = defaultWindow } = options;

	const position = readable(getCurrentPointerPosition(), (set) => {
		function handler(e: MouseEvent) {
			set(getCurrentPointerPosition(e));
		}

		if (window) {
			const stopMove = listen(window, "pointermove", handler as () => void);
			const stopDown = listen(window, "pointerdown", handler as () => void);

			return () => {
				stopMove();
				stopDown();
			};
		}
	});

	return position;
}