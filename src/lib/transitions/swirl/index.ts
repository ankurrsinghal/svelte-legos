import type { EasingFunction, TransitionConfig } from "svelte/transition";
import { linear } from "svelte/easing";

interface SwirlParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
}

export function swirl(node: HTMLElement, params: SwirlParams = {}): TransitionConfig {
	const { delay = 0, duration = 600, easing = linear } = params;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `transform: rotate(${t * -540}deg) scale(${t}); opacity: ${t}`,
	};
}
