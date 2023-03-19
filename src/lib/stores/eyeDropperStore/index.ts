import { writableToReadable } from "$lib/shared";
import { writable } from "svelte/store";

export interface EyeDropperOpenOptions {
	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
	 */
	signal?: AbortSignal;
}

export interface EyeDropper {
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (): EyeDropper;
	open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>;
	[Symbol.toStringTag]: "EyeDropper";
}

export function eyeDropperStore(initialColor?: string) {
	const store = writable(initialColor);

	const open = () => {
		const isSupported = typeof window !== "undefined" && "EyeDropper" in window;
		if (!isSupported) {
			console.warn("Eyedropeer is not supported");
			return;
		}

		const eyeDropper: EyeDropper = new (window as any).EyeDropper();
		eyeDropper
			.open()
			.then((result) => {
				store.set(result.sRGBHex);
			})
			.catch((e) => {
				console.warn(e);
			});
	};

	return {
		open,
		color: writableToReadable(store),
	};
}
