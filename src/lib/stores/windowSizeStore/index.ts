import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { readable } from "svelte/store";
import { listen } from "svelte/internal";

function getCurrentWindowDimenstions() {
	if (typeof window === "object" && "innerWidth" in window && "innerHeight" in window) {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	return {
		width: 0,
		height: 0,
	};
}

export function windowSizeStore({ window = defaultWindow }: ConfigurableWindow = {}) {
	const size = readable(getCurrentWindowDimenstions(), (set) => {
		let stop = () => {};
		
		function handler() {
			set(getCurrentWindowDimenstions());
		}

		if(window) {
			stop = listen(window, "resize", handler);
		}
		
		return () => {
			stop();
		};
	});

	return size;
}
