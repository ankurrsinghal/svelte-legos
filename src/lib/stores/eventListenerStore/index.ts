import { tryOnDestroy } from "$lib/shared";

interface UseEventListenerReturnType {
	start: () => void;
	stop: () => void;
}

// MediaQueryList Event based useEventListener interface
export function eventListenerStore<K extends keyof MediaQueryListEventMap>(
	eventName: K,
	handler: (event: MediaQueryListEventMap[K]) => void,
	element: MediaQueryList,
	options?: boolean | AddEventListenerOptions
): UseEventListenerReturnType;

// Window Event based useEventListener interface
export function eventListenerStore<K extends keyof WindowEventMap>(
	eventName: K,
	handler: (event: WindowEventMap[K]) => void,
	element?: undefined,
	options?: boolean | AddEventListenerOptions
): UseEventListenerReturnType;

// Element Event based useEventListener interface
export function eventListenerStore<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLDivElement
>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element: T,
	options?: boolean | AddEventListenerOptions
): UseEventListenerReturnType;

// Document Event based useEventListener interface
export function eventListenerStore<K extends keyof DocumentEventMap>(
	eventName: K,
	handler: (event: DocumentEventMap[K]) => void,
	element: Document,
	options?: boolean | AddEventListenerOptions
): UseEventListenerReturnType;

export function eventListenerStore<
	KW extends keyof WindowEventMap,
	KH extends keyof HTMLElementEventMap,
	KM extends keyof MediaQueryListEventMap,
	T extends HTMLElement | MediaQueryList | void = void
>(
	eventName: KW | KH | KM,
	handler: (
		event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | Event
	) => void,
	element?: T,
	options?: boolean | AddEventListenerOptions
) {
	// Create event listener that calls handler function stored in ref
	const listener: typeof handler = (event) => handler(event);

	function start() {
		const targetElement: T | Window = element ?? window;
		if (!(targetElement && targetElement.addEventListener)) return;
		targetElement && targetElement.addEventListener(eventName, listener, options);
	}

	function stop() {
		const targetElement: T | Window = element ?? window;
		if (!(targetElement && targetElement.addEventListener)) return;
		targetElement.removeEventListener(eventName, listener, options);
	}

	start();

	tryOnDestroy(stop);

	return { start, stop };
}
