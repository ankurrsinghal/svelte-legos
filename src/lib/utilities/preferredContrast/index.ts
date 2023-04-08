import { derived, type Readable } from "svelte/store";
import { mediaQuery } from "../mediaQuery";

export type ContrastType = "more" | "less" | "custom" | "no-preference";

export function preferredContrast(): Readable<ContrastType> {
	const isMore = mediaQuery("(prefers-contrast: more)");
	const isLess = mediaQuery("(prefers-contrast: less)");
	const isCustom = mediaQuery("(prefers-contrast: custom)");

	return derived([isMore, isLess, isCustom], ([$isMore, $isLess, $isCustom]) => {
		if ($isMore) return "more";
		if ($isLess) return "less";
		if ($isCustom) return "custom";
		return "no-preference";
	});
}
