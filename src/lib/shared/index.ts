import { onDestroy } from "svelte";
import { get, type Readable, type Writable } from "svelte/store";

// Import get_current_component, but make it optional
let get_current_component: (() => any) | undefined;
try {
	// This will work in Svelte 4 but fail in Svelte 5
	get_current_component = require('svelte/internal').get_current_component;
} catch {
	// In Svelte 5, this import will fail, so we set it to undefined
}

export function tryOnDestroy(fn: () => void) {
	try {
		// If get_current_component is available (Svelte 4), use it
		if (get_current_component) {
			get_current_component();
		}
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

// Define isClient without relying on svelte/internal
export const isClient = typeof window !== 'undefined';
export const defaultWindow = isClient ? window : undefined;
export const defaultDocument = isClient ? window.document : undefined;
