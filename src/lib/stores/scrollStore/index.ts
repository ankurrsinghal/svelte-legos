import { defaultWindow } from "$lib/shared";
import { noop } from "$lib/shared/utils/utils";
import { get, readable, writable } from "svelte/store";

export interface UseScrollOptions {
	/**
	 * Offset arrived states by x pixels
	 *
	 */
	offset?: {
		left?: number;
		right?: number;
		top?: number;
		bottom?: number;
	};

	/**
	 * Trigger it when scrolling.
	 *
	 */
	onScroll?: (e: Event) => void;

	/**
	 * Trigger it when scrolling ends.
	 *
	 */
	onStop?: (e: Event) => void;

	/**
	 * Listener options for scroll event.
	 *
	 * @default {capture: false, passive: true}
	 */
	eventListenerOptions?: boolean | AddEventListenerOptions;

	/**
	 * Optionally specify a scroll behavior of `auto` (default, not smooth scrolling) or
	 * `smooth` (for smooth scrolling) which takes effect when changing the `x` or `y` refs.
	 *
	 * @default 'auto'
	 */
	behavior?: ScrollBehavior;

	/**
	 * On error callback
	 *
	 * Default log error to `console.error`
	 */
	onError?: (error: unknown) => void;
}

/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;

export function scrollStore<T extends HTMLElement, P extends Window, S extends Document>(
	element: T | P | S | null,
	options: UseScrollOptions = {}
) {
	const window = defaultWindow;
	const {
		onStop = noop,
		onScroll = noop,
		offset = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		},
		eventListenerOptions = {
			capture: false,
			passive: true,
		},
		behavior = "auto",
		onError = (e) => {
			console.error(e);
		},
	} = options;

	const x = writable(0);
	const y = writable(0);
	const isScrolling = writable(false);

	return readable(
		{
			x,
			y,
			isScrolling,
			arrivedState: {
				left: true,
				right: false,
				top: true,
				bottom: false,
			},
			directions: {
				left: false,
				right: false,
				top: false,
				bottom: false,
			},
		},
		(_, update) => {
			const __xStop = x.subscribe((_x) => {
				scrollTo(_x, undefined);
			});

			const __yStop = y.subscribe((_y) => {
				scrollTo(undefined, _y);
			});

			function scrollTo(_x: number | undefined, _y: number | undefined) {
				if (!window) return;
				if (!element) return;

				(element instanceof Document ? window.document.body : element)?.scrollTo({
					top: _y ?? get(y),
					left: _x ?? get(x),
					behavior,
				});
				const scrollContainer =
					(element as Window)?.document?.documentElement ||
					(element as Document)?.documentElement ||
					(element as Element);
				x.set(scrollContainer.scrollLeft);
				y.set(scrollContainer.scrollTop);
			}

			const onScrollEnd = (e: Event) => {
				// dedupe if support native scrollend event
				if (!get(isScrolling)) return;
				isScrolling.set(false);
				update((store) => ({
					...store,
					directions: {
						left: false,
						right: false,
						top: false,
						bottom: false,
					},
				}));
				onStop(e);
			};

			const setArrivedState = (
				target: HTMLElement | SVGElement | Window | Document | null | undefined
			) => {
				if (!window) return;

				const el: Element = ((target as Window)?.document?.documentElement ||
					(target as Document)?.documentElement ||
					(target as HTMLElement | SVGElement)) as Element;

				const { display, flexDirection } = getComputedStyle(el);

				const scrollLeft = el.scrollLeft;
				update((store) => {
					const { arrivedState, directions } = store;
					const newDirections = {
						...directions,
					};
					const newArrivedState = {
						...arrivedState,
					};

					const internalY = get(y);
					const internalX = get(x);

					newDirections.left = scrollLeft < internalX;
					newDirections.right = scrollLeft > internalX;

					const left = Math.abs(scrollLeft) <= (offset.left || 0);
					const right =
						Math.abs(scrollLeft) + el.clientWidth >=
						el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;

					if (display === "flex" && flexDirection === "row-reverse") {
						newArrivedState.left = right;
						newArrivedState.right = left;
					} else {
						newArrivedState.left = left;
						newArrivedState.right = right;
					}

					x.set(scrollLeft);

					let scrollTop = el.scrollTop;

					// patch for mobile compatible
					if (target === window.document && !scrollTop) scrollTop = window.document.body.scrollTop;

					newDirections.top = scrollTop < internalY;
					newDirections.bottom = scrollTop > internalY;
					const top = Math.abs(scrollTop) <= (offset.top || 0);
					const bottom =
						Math.abs(scrollTop) + el.clientHeight >=
						el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;

					/**
					 * reverse columns and rows behave exactly the other way around,
					 * bottom is treated as top and top is treated as the negative version of bottom
					 */
					if (display === "flex" && flexDirection === "column-reverse") {
						newArrivedState.top = bottom;
						newArrivedState.bottom = top;
					} else {
						newArrivedState.top = top;
						newArrivedState.bottom = bottom;
					}

					y.set(scrollTop);

					return {
						...store,
						directions: newDirections,
						arrivedState: newArrivedState,
					};
				});
			};

			const onScrollHandler = (e: Event) => {
				if (!window) return;
				const eventTarget = ((e.target as Document).documentElement ?? e.target) as HTMLElement;
				setArrivedState(eventTarget);
				isScrolling.set(true);
				onScrollEnd(e);
				onScroll(e);
			};

			element?.addEventListener("scroll", onScrollHandler);
			element?.addEventListener("scrollend", onScrollEnd);

			function _stop() {
				element?.removeEventListener("scroll", onScrollHandler, eventListenerOptions);
			}

			function __stop() {
				element?.removeEventListener("scrollend", onScrollEnd, eventListenerOptions);
			}

			function cleanup() {
				console.log("cleaning", element);
				_stop && _stop();
				__stop && __stop();
				__xStop && __xStop();
				__yStop && __yStop();
			}

			return cleanup;
		}
	);
}
