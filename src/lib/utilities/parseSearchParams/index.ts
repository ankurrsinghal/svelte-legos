import { defaultWindow, tryOnDestroy, writableToReadable } from "$lib/shared";
import { pausableWatch } from "$lib";
import { type Writable, writable, get, type Readable, readable } from "svelte/store";

export type UrlParams = Record<string, string[] | string>;

export interface UseUrlSearchParamsOptions<T> {
	/**
	 * @default true
	 */
	removeNullishValues?: boolean;

	/**
	 * @default false
	 */
	removeFalsyValues?: boolean;

	/**
	 * @default {}
	 */
	initialValue?: T;

	/**
	 * Write back to `window.history` automatically
	 *
	 * @default true
	 */
	write?: boolean;
}

type ReturnType<T> = { params: Readable<T>; updateParams: (key: string, value: string) => void };

/**
 * Reactive URLSearchParams
 *
 * @see https://vueuse.org/useUrlSearchParams
 * @param mode
 * @param options
 */
export function parseSearchParams<T extends Record<string, any> = UrlParams>(
	mode: "history" | "hash" | "hash-params" = "history",
	options: UseUrlSearchParamsOptions<T> = {}
): ReturnType<T> {
	const {
		initialValue = {},
		removeNullishValues = true,
		removeFalsyValues = false,
		write: enableWrite = true,
	} = options;

	const window = defaultWindow!;

	if (!window) return { params: readable({}), updateParams: (_, __) => {} } as ReturnType<T>;

	const state: Writable<Record<string, any>> = writable({});

	function getRawParams() {
		if (mode === "history") {
			return window.location.search || "";
		} else if (mode === "hash") {
			const hash = window.location.hash || "";
			const index = hash.indexOf("?");
			return index > 0 ? hash.slice(index) : "";
		} else {
			return (window.location.hash || "").replace(/^#/, "");
		}
	}

	function constructQuery(params: URLSearchParams) {
		const stringified = params.toString();

		if (mode === "history")
			return `${stringified ? `?${stringified}` : ""}${window.location.hash || ""}`;
		if (mode === "hash-params")
			return `${window.location.search || ""}${stringified ? `#${stringified}` : ""}`;
		const hash = window.location.hash || "#";
		const index = hash.indexOf("?");
		if (index > 0) return `${hash.slice(0, index)}${stringified ? `?${stringified}` : ""}`;
		return `${hash}${stringified ? `?${stringified}` : ""}`;
	}

	function read() {
		return new URLSearchParams(getRawParams());
	}

	function updateState(params: URLSearchParams) {
		const unusedKeys = new Set(Object.keys(state));
		const newRecord = get(state);
		for (const key of params.keys()) {
			const paramsForKey = params.getAll(key);
			newRecord[key] = paramsForKey.length > 1 ? paramsForKey : params.get(key) || "";
			unusedKeys.delete(key);
		}
		Array.from(unusedKeys).forEach((key) => {
			delete newRecord[key];
		});
		state.set({ ...newRecord });
	}

	const { pause, resume } = pausableWatch(state, () => {
		const params = new URLSearchParams("");
		const record = get(state);
		Object.keys(record).forEach((key) => {
			const mapEntry = record[key];
			if (Array.isArray(mapEntry)) mapEntry.forEach((value) => params.append(key, value));
			else if (removeNullishValues && mapEntry == null) params.delete(key);
			else if (removeFalsyValues && !mapEntry) params.delete(key);
			else params.set(key, mapEntry);
		});
		write(params);
	});

	function write(params: URLSearchParams, shouldUpdate?: boolean) {
		pause();

		if (shouldUpdate) updateState(params);

		window.history.replaceState(
			window.history.state,
			window.document.title,
			window.location.pathname + constructQuery(params)
		);

		resume();
	}

	function onChanged() {
		if (!enableWrite) return;

		write(read(), true);
	}

	window.addEventListener("popstate", onChanged, false);
	if (mode !== "history") window.addEventListener("hashchange", onChanged, false);

	tryOnDestroy(() => {
		window.removeEventListener("popstate", onChanged, false);
		if (mode !== "history") window.removeEventListener("hashchange", onChanged, false);
	});

	const initial = read();
	if (initial.keys().next().value) updateState(initial);
	else state.set(initialValue);

	function updateParams(key: string, value: string) {
		state.update((records) => {
			return { ...records, [key]: value };
		});
	}

	return {
		params: writableToReadable(state as Writable<T>),
		updateParams,
	};
}
