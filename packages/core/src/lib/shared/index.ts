import { get_current_component, onDestroy } from 'svelte/internal';
import { get, type Readable, type Writable } from 'svelte/store';

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

export function writableToReadable<T>(store: Writable<T>): Readable<T> {
	return { subscribe: store.subscribe };
}

export function isWritable<T>(ref: T | Writable<T>): boolean {
	if (ref === null) return false;

	if (typeof ref === 'object') {
		return 'set' in ref && 'update' in ref && 'subscribe' in ref;
	}

	return false;
}

export function unwrapWritable<T>(ref: T | Writable<T>) {
	if (isWritable(ref)) {
		return get(ref as Writable<T>);
	}

	return ref as T;
}

export function isSafeIntegerThrowable(int: number) {
	if (!Number.isSafeInteger(int)) {
		throw new Error("Interval is not a safe integer");
	}
}