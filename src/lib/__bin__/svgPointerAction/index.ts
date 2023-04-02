const SVG_POINTER_EVENT = {
	Move: "svg.pointermove",
	Down: "svg.pointerdown",
	Up: "svg.pointerup",
	Click: "svg.click",
} as const;

interface SvgPointerEventData<E extends MouseEvent | PointerEvent> {
	x: number;
	y: number;
	originalEvent: E;
}

declare global {
	namespace svelteHTML {
		interface SVGAttributes<T> {
			"on:svg.pointermove"?: (event: CustomEvent<SvgPointerEventData<PointerEvent>>) => unknown;
			"on:svg.pointedown"?: (event: CustomEvent<SvgPointerEventData<PointerEvent>>) => unknown;
			"on:svg.pointerup"?: (event: CustomEvent<SvgPointerEventData<PointerEvent>>) => unknown;
			"on:svg.click"?: (event: CustomEvent<SvgPointerEventData<MouseEvent>>) => unknown;
		}
	}
}

/**
 * Facilitates retrieving the pointer's position as transformed by the host viewboxed svg element's
 * auto-scaling.
 *
 * @see https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
 */
export default function svgPointerAction(svg: SVGSVGElement, {}: {} = {}) {
	const pt = svg.createSVGPoint();

	function getSvgPointer<E extends MouseEvent | PointerEvent>(e: E) {
		pt.x = e.clientX;
		pt.y = e.clientY;
		const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
		return {
			x: transformed.x,
			y: transformed.y,
			originalEvent: e,
		} satisfies SvgPointerEventData<E>;
	}

	function handlePointerMove(e: PointerEvent) {
		svg.dispatchEvent(new CustomEvent(SVG_POINTER_EVENT.Move, { detail: getSvgPointer(e) }));
	}
	function handlePointerDown(e: PointerEvent) {
		svg.dispatchEvent(new CustomEvent(SVG_POINTER_EVENT.Down, { detail: getSvgPointer(e) }));
	}
	function handlePointerUp(e: PointerEvent) {
		svg.dispatchEvent(new CustomEvent(SVG_POINTER_EVENT.Up, { detail: getSvgPointer(e) }));
	}
	function handleClick(e: MouseEvent) {
		svg.dispatchEvent(new CustomEvent(SVG_POINTER_EVENT.Click, { detail: getSvgPointer(e) }));
	}

	svg.addEventListener("pointermove", handlePointerMove);
	svg.addEventListener("pointerdown", handlePointerDown);
	svg.addEventListener("pointerup", handlePointerUp);
	svg.addEventListener("click", handleClick);

	return {
		update(args) {},
		destroy() {
			svg.removeEventListener("pointermove", handlePointerMove);
			svg.removeEventListener("pointerdown", handlePointerDown);
			svg.removeEventListener("pointerup", handlePointerUp);
			svg.removeEventListener("click", handleClick);
		},
	} satisfies SvelteActionReturnType;
}
