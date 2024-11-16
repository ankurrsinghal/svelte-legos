import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { readable } from "svelte/store";

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

		let cleanup = Function.prototype;

		if (window) {
			window.addEventListener("resize", handler);
			cleanup = () => {
				window.removeEventListener("resize", handler);
			}
		}
		
		return () => {
			cleanup();
		};
	});

	return size;
}
