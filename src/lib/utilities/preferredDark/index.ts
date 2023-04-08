import { mediaQuery } from "../mediaQuery";

export function preferredDark() {
	return mediaQuery("(prefers-color-scheme: dark)");
}
