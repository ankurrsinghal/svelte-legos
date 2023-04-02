import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow, Position } from "$lib/shared/utils/types";
import { mouseStore } from "$lib/stores/mouseStore";
import { readable, type Readable } from "svelte/store";

function getInitialState() {
	return {};
}

export function mouseInElement(target: HTMLElement) {
	let elementX = 0;
	let elementY = 0;
	let elementPositionX = 0;
	let elementPositionY = 0;
	let elementHeight = 0;
	let elementWidth = 0;
	let isOutside = true;

	return readable(getInitialState(), (set) => {
		const unsub = mouseStore().subscribe((position) => {
			if (!target) return;
			const { x, y } = position;

			const { left, top, width, height } = target.getBoundingClientRect();

			elementPositionX = left + window.pageXOffset;
			elementPositionY = top + window.pageYOffset;
			elementHeight = height;
			elementWidth = width;

			const elX = x - elementPositionX;
			const elY = y - elementPositionY;
			isOutside = width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;

			set({
				x,
				y,
				elementX,
				elementY,
				elementPositionX,
				elementPositionY,
				elementHeight,
				elementWidth,
				isOutside,
				stop,
			});
		});

		return unsub;
	});
}
