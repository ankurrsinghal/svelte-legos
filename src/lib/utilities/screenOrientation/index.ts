import { defaultWindow } from "$lib/shared";
import { readable } from "svelte/store";

export function screenOrientation() {
	return readable({ isSupported: false, orientation: "portrait-primary", angle: 0 }, (set) => {
		const window = defaultWindow;
		let stop = () => {};

		function update() {
			const isSupported = !!(window && "screen" in window && "orientation" in window.screen);
			if (!isSupported) return;

			const screenOrientation = isSupported
				? window!.screen.orientation
				: ({} as ScreenOrientation);
			const orientation = screenOrientation.type;
			const angle = screenOrientation.angle || 0;
			set({
				isSupported,
				orientation,
				angle,
			});
		}

		if (window) {
			window.createEventListener("orientationchange", update);
			stop = () => {
				window.removeEventListener("orientationchange", update);
			}
		}

		update();

		return stop;
	});
}
