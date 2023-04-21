import { get_current_component, onDestroy } from "svelte/internal";
import { get, type Readable, type Writable } from "svelte/store";
import { is_client } from "svelte/internal";

export function tryOnDestroy(fn: () => void) {
	try {
		get_current_component();
		onDestroy(fn);
	} catch {
		// fail silently
	}
}

export function noop() {
	// noop
}

export function writableToReadable<T>({ subscribe }: Writable<T>): Readable<T> {
	return { subscribe: subscribe };
}

export function isReadable<T>(ref: T | Readable<T>): boolean {
	if (ref === null) return false;

	if (typeof ref === "object") {
		return "subscribe" in ref;
	}

	return false;
}

export function unwrapReadable<T>(ref: T | Readable<T>) {
	if (isReadable(ref)) {
		return get(ref as Readable<T>);
	}

	return ref as T;
}

export function isSafeIntegerThrowable(int: unknown) {
	if (!Number.isSafeInteger(int)) {
		throw new Error("Interval is not a safe integer");
	}
}

export const isClient = is_client;
export const defaultWindow = is_client ? window : undefined;
export const defaultDocument = is_client ? window.document : undefined;
