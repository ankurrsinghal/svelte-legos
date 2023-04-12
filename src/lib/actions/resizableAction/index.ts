import { append, attr, element } from "svelte/internal";

type ResizeHandler = (dx: number, dy: number) => void;

type CornerType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

class Corner<T extends Element> {
	private type: CornerType;
	private __corner?: HTMLDivElement;
	private __anchor: T;
	private __anchorRect: DOMRect;
	private __onResize: ResizeHandler;

	constructor(anchor: T, type: CornerType, resizeHandler: ResizeHandler) {
		this.type = type;
		this.__anchor = anchor;
		this.__anchorRect = anchor.getBoundingClientRect();
		this.__onResize = resizeHandler;
		this.init();
	}

	private init() {
		const horizontal =
			this.type === "top-left" || this.type === "bottom-left" ? "left: -5px;" : "right: -5px;";
		const vertical =
			this.type === "top-right" || this.type === "top-left" ? "top: -5px;" : "bottom: -5px;";

		const cursor =
			this.type === "top-left" || this.type === "bottom-right" ? "nwse-resize" : "nesw-resize";

		const cornerStyles = `
      width: 10px;
      height: 10px;
      border: 1px solid black;
      background: #ddd;
      position: absolute;
      ${horizontal};
      ${vertical};
      cursor: ${cursor};
    `;
		const corner = element("div");
		attr(corner, "style", cornerStyles);

		append(this.__anchor, corner);

		let isDragging = false;
		function handlePointerDown(e: PointerEvent) {
			if (e.buttons === 2) return;
			corner.setPointerCapture(e.pointerId);
			isDragging = true;
		}

		function handlePointerMove(this: Corner<T>, e: PointerEvent) {
			if (isDragging) {
				this.__onResize(e.movementX, e.movementY);
			}
		}

		function handlePointerUp(e: PointerEvent) {
			corner.releasePointerCapture(e.pointerId);
			isDragging = false;
		}

		corner.addEventListener("pointerdown", handlePointerDown);
		corner.addEventListener("pointermove", handlePointerMove.bind(this));
		corner.addEventListener("pointerup", handlePointerUp);

		this.__corner = corner;
	}
}

export function resizableAction<T extends HTMLElement>(node: T) {
	node.style.setProperty("position", "absolute");
	node.style.setProperty("z-index", "1000000");
	node.style.setProperty("border", "1px dashed black");
	const bounds = node.getBoundingClientRect();

	const rect = { top: bounds.top, left: bounds.left, width: bounds.width, height: bounds.height };
	new Corner(node, "top-left", (dx, dy) => {
		if (rect.width - dx <= 0) return;
		if (rect.height - dy <= 0) return;

		rect.top += dy;
		rect.left += dx;
		rect.height -= dy;
		rect.width -= dx;

		updateRect();
	});

	new Corner(node, "top-right", (dx, dy) => {
		if (rect.width + dx <= 0) return;
		if (rect.height - dy <= 0) return;

		rect.top += dy;
		rect.height -= dy;
		rect.width += dx;

		updateRect();
	});

	new Corner(node, "bottom-left", (dx, dy) => {
		if (rect.width - dx <= 0) return;
		if (rect.height + dy <= 0) return;

		rect.left += dx;
		rect.height += dy;
		rect.width -= dx;

		updateRect();
	});

	new Corner(node, "bottom-right", (dx, dy) => {
		if (rect.width + dx <= 0) return;
		if (rect.height + dy <= 0) return;

		rect.height += dy;
		rect.width += dx;

		updateRect();
	});

	function updateRect() {
		node.style.setProperty("top", rect.top + "px");
		node.style.setProperty("left", rect.left + "px");
		node.style.setProperty("width", rect.width + "px");
		node.style.setProperty("height", rect.height + "px");
	}

	return {
		destroy() {},
	};
}
