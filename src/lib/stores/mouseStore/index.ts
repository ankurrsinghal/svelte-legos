import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow, Position } from "$lib/shared/utils/types";
import { readable, type Readable } from "svelte/store";
import { listen } from "svelte/internal";

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

function getCurrentMousePosition(e?: MouseEvent): Position {
	if (!e) return initialValue;

	return {
		x: e.pageX,
		y: e.pageY,
	};
}

export function mouseStore(options: UseMouseOptions = {}): Readable<Position> {
	const { window = defaultWindow } = options;

	const position = readable(getCurrentMousePosition(), (set) => {
		function handler(e: MouseEvent) {
			set(getCurrentMousePosition(e));
		}

		if (window) {
			const stop = listen(window, "mousemove", handler as () => void);

			return () => {
				stop();
			};
		}
	});

	return position;
}
