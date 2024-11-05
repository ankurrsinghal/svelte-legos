import { readable, type Readable } from "svelte/store";
import type { ConfigurableWindow, Position } from "$lib/shared/utils/types";
import {isClient} from "$lib/shared";

const defaultWindow = isClient ? window : undefined;

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
			window.createEventListener("pointermove", handler as () => void);
			window.createEventListener("pointerdown", handler as () => void);

			return () => {
				window.removeEventListener("pointermove", handler as () => void);
				window.removeEventListener("pointerdown", handler as () => void);
			};
		}
	});

	return position;
}