import type { EasingFunction, TransitionConfig } from "svelte/transition";
import { linear } from "svelte/easing";

type Direction =
	| "top"
	| "top-right"
	| "right"
	| "bottom-right"
	| "bottom"
	| "bottom-left"
	| "left"
	| "top-left";

interface SlideParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	direction?: Direction;
}

function getTransform(direction: Direction, value: number) {
	switch (direction) {
		case "top":
			return `translateY(-${value}%)`;
		case "bottom":
			return `translateY(${value}%)`;
		case "left":
			return `translateX(-${value}%)`;
		case "right":
			return `translateX(${value}%)`;
		case "top-left":
			return `translateY(-${value}%) translateX(-${value}%)`;
		case "top-right":
			return `translateY(-${value}%) translateX(${value}%)`;
		case "bottom-left":
			return `translateY(${value}%) translateX(-${value}%)`;
		case "bottom-right":
			return `translateY(${value}%) translateX(${value}%)`;
	}
}

export function slide(node: HTMLElement, params: SlideParams = {}): TransitionConfig {
	const { delay = 0, duration = 300, easing = linear, direction = "top" } = params;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `transform: ${getTransform(direction, u * 100)}; opacity: ${t}`,
	};
}
