import { derived } from "svelte/store";
import { mediaQuery } from "../mediaQuery";

export type ReducedMotionType = "reduce" | "no-preference";

export function preferredReduceMotion() {
	const isReduced = mediaQuery("(prefers-reduced-motion: reduce)");

	return derived(isReduced, ($isReduced) => {
		if ($isReduced) return "reduce";
		return "no-preference";
	});
}
