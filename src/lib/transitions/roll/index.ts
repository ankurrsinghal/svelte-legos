import type { EasingFunction, TransitionConfig } from "svelte/transition";
import { linear } from "svelte/easing";

type Direction = "top" | "right" | "bottom" | "left";

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
	}
}

export function roll(node: HTMLElement, params: SlideParams = {}): TransitionConfig {
	const { delay = 0, duration = 600, easing = linear, direction = "top" } = params;

	return {
		delay,
		duration,
		easing,
		css: (t, u) =>
			`transform: ${getTransform(direction, u * 100)} rotate(${t * 360}deg); opacity: ${t}`,
	};
}
