import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow, Position } from "$lib/shared/utils/types";
import { readable, type Readable } from "svelte/store";

const initialValue: Position = {
	x: 0,
	y: 0,
};

function getCurrentScroll(window = defaultWindow): Position {
	if (!window) return initialValue;
	return {
		x: window.scrollX,
		y: window.scrollY,
	};
}

export function windowScrollStore({
	window = defaultWindow,
}: ConfigurableWindow = {}): Readable<Position> {
	const position = readable(getCurrentScroll(), (set) => {
		function handler() {
			set(getCurrentScroll());
		}

		if (window) {
			window.createEventListener("scroll", handler);

			return () => {
				window.removeEventListener("scroll", handler);
			};
		}
	});

	return position;
}
