import { defaultWindow } from "$lib/shared";
import { readable, type Readable } from "svelte/store";
import { listen } from "svelte/internal";

export function preferredLanguages(): Readable<readonly string[]> {
	return readable(["en"] as readonly string[], (set) => {
		const window = defaultWindow;

		let cleanup = () => {};

		if (window) {
			const navigator = window.navigator;
			set(navigator.languages);

			function update() {
				set(navigator.languages);
			}

			cleanup = listen(window, "languagechange", update);
		}

		return cleanup;
	});
}
