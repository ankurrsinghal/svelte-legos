import { defaultWindow } from "$lib/shared";
import { readable, type Readable } from "svelte/store";

export function preferredLanguages(): Readable<readonly string[]> {
	return readable(["en"] as readonly string[], (set) => {
		const window = defaultWindow;

		let cleanup = () => {};

		if (window) {
			const navigator = window.navigator;
			set(navigator.languages);

			function update() {
				cleanup();
				set(navigator.languages);
			}

			window.addEventListener("languagechange", update);
			cleanup = () => window.removeEventListener("languagechange", update);
		}

		return cleanup;
	});
}
