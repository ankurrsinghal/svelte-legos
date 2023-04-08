import { derived, type Readable } from "svelte/store";
import { mediaQuery } from "../mediaQuery";

export type ColorSchemeType = "dark" | "light" | "no-preference";

export function preferredColorScheme(): Readable<ColorSchemeType> {
	const isLight = mediaQuery("(prefers-color-scheme: light)");
	const isDark = mediaQuery("(prefers-color-scheme: dark)");

	return derived([isLight, isDark], ([$isLight, $isDark]) => {
		if ($isDark) return "dark";
		if ($isLight) return "light";
		return "no-preference";
	});
}
