import { defaultWindow, isReadable, tryOnDestroy, unwrapReadable } from "$lib/shared";
import { type Readable, readable } from "svelte/store";
import { hasPermission } from "../hasPermission";
import { timeoutFnStore } from "$lib/stores/timeoutFnStore";

export interface UseClipboardOptions {
	/**
	 * Enabled reading for clipboard
	 *
	 * @default false
	 */
	read?: boolean;

	/**
	 * Copy source
	 */
	source?: Readable<string> | string;

	/**
	 * Milliseconds to reset state of `copied` ref
	 *
	 * @default 1500
	 */
	copiedDuring?: number;

	/**
	 * Whether fallback to document.execCommand('copy') if clipboard is undefined.
	 *
	 * @default false
	 */
	legacy?: boolean;
}

export interface UseClipboardReturn {
	isSupported: boolean;
	text: string;
	copied: boolean;
	copy: (text?: string) => Promise<void>;
}

export function clipboard(options: UseClipboardOptions = {}): Readable<UseClipboardReturn> {
	const { read = false, source, legacy = false, copiedDuring } = options;
	const isClipboardApiSupported =
		defaultWindow && defaultWindow.navigator && "clipboard" in defaultWindow.navigator;
	const isSupported = isClipboardApiSupported || legacy;

	const permissionRead = hasPermission("clipboard-read");
	const permissionWrite = hasPermission("clipboard-write");

	function isAllowed(status: Readable<PermissionState | undefined>) {
		const state = unwrapReadable(status);
		return state === "granted" || state === "prompt";
	}

	function legacyCopy(value: string) {
		const ta = document.createElement("textarea");
		ta.value = value ?? "";
		ta.style.position = "absolute";
		ta.style.opacity = "0";
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		ta.remove();
	}

	let copy = async () => {};

	return readable<UseClipboardReturn>(
		{ isSupported, text: "", copy, copied: false },
		(_, update) => {
			const timeout = timeoutFnStore(() => {
				update((store) => ({
					...store,
					copied: false,
				}));
			}, copiedDuring);

			async function copy(value = source) {
				const unwrappedValue = unwrapReadable(value);
				if (isSupported && unwrappedValue) {
					if (isClipboardApiSupported && isAllowed(permissionWrite))
						await navigator!.clipboard.writeText(unwrappedValue);
					else legacyCopy(unwrappedValue);

					update((store) => ({
						...store,
						text: unwrappedValue,
						copied: true,
					}));
					timeout.start();
				}
			}

			update((store) => ({
				...store,
				copy,
			}));

			function updateText() {
				if (isClipboardApiSupported && isAllowed(permissionRead)) {
					navigator!.clipboard.readText().then((value) => {
						update((store) => ({
							...store,
							text: value,
						}));
					});
				} else {
					update((store) => ({
						...store,
						text: legacyRead(),
					}));
				}
			}
			if (isSupported && read) {
				defaultWindow?.addEventListener("copy", updateText);
				defaultWindow?.addEventListener("cut", updateText);
			}

			function cleanup() {
				defaultWindow?.removeEventListener("copy", updateText);
				defaultWindow?.removeEventListener("cut", updateText);
			}

			function legacyRead() {
				return defaultWindow?.document?.getSelection?.()?.toString() ?? "";
			}

			return cleanup;
		}
	);
}
