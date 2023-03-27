import { hoverStore } from "$lib/stores/hoverStore";
import { readableStore } from "$lib/stores/readableStore";

type Placement = "center" | "left" | "right";
class Tooltip<T extends HTMLElement> {
	contents: string;
	private anchorRect: DOMRect;
	private __container: HTMLDivElement;
	private __placement: Placement;
	private __displayPointer: boolean;

	static POINTER_SIZE = 8;

	constructor(contents: string, anchor: T, placement: Placement = "center", pointer = true) {
		this.contents = contents;
		this.anchorRect = anchor.getBoundingClientRect();
		this.__container = document.createElement("div");
		this.__placement = placement;
		this.__displayPointer = pointer;
		this.init();
	}

	private init() {
		this.__container.style.setProperty("position", "absolute");
		this.__container.style.setProperty("top", "0px");
		this.__container.style.setProperty("left", "0px");
		this.__container.style.setProperty("z-index", "100000");
		this.__container.style.setProperty("background-color", "black");
		this.__container.style.setProperty("color", "white");
		this.__container.style.setProperty("padding", "5px 15px");
		this.__container.style.setProperty("border-radius", "4px");
		this.__container.style.setProperty("opacity", "0");
		this.__container.style.setProperty("visibility", "hidden");
		this.__container.style.setProperty("transition", "opacity .3s, visibility .3s");
		this.__container.style.setProperty("font-size", "12px");

		this.__container.textContent = this.contents;

		this.mount();
		this.position(window, this.anchorRect);
		if (this.__displayPointer) this.addPointer();
	}

	private mount() {
		document.body.appendChild(this.__container);
	}

	public position(window: Window, anchorRect: DOMRect) {
		let top, left;

		const { height, width } = anchorRect;

		const {
			top: anchorTop,
			height: anchorHeight,
			width: anchorWidth,
			left: anchorLeft,
		} = anchorRect;

		const { scrollY, scrollX } = window;

		if (this.__placement === "center") {
			top = anchorTop + scrollY - height - (this.__displayPointer ? Tooltip.POINTER_SIZE : 0);
			left = anchorLeft + scrollX + anchorWidth / 4 - width / 2;
		} else if (this.__placement === "left") {
			top = anchorTop + scrollY - height - (this.__displayPointer ? Tooltip.POINTER_SIZE : 0);
			left = anchorLeft + scrollX;
		} else {
			// right
			top = anchorTop + scrollY - height - (this.__displayPointer ? Tooltip.POINTER_SIZE : 0);
			left = anchorLeft + scrollX + anchorWidth / 2 - width;
		}

		this.__container.style.setProperty("top", top + "px");
		this.__container.style.setProperty("left", left + "px");
	}

	show() {
		this.mount();
		this.__container.style.setProperty("opacity", "1");
		this.__container.style.setProperty("visibility", "visible");
	}

	hide() {
		this.unmount();
		this.__container.style.setProperty("opacity", "0");
		this.__container.style.setProperty("visibility", "hidden");
	}

	unmount() {
		this.__container.remove();
	}

	addPointer() {
		const pointerX =
			this.__placement === "center"
				? "left: 50%;"
				: this.__placement === "left"
				? "left: 20%;"
				: "right: 20%;";

		const styles = `
      width: 0;
      height: 0;
      border-left: ${Tooltip.POINTER_SIZE}px solid transparent;
      border-right: ${Tooltip.POINTER_SIZE}px solid transparent;
      border-top: ${Tooltip.POINTER_SIZE}px solid black;
      position: absolute;
      ${pointerX}
      bottom: 0;
      transform: translate(-50%, 98%);
    `;
		const span = document.createElement("span");
		span.setAttribute("style", styles);
		this.__container.appendChild(span);
	}
}

interface ActionTooltipOptions {
	content: string;
	placement: Placement;
	pointer?: boolean;
}

export function tooltipAction<T extends HTMLElement>(
	node: T,
	options: string | ActionTooltipOptions
) {
	let tooltip: Tooltip<T>;
	function positionTooltip() {
		tooltip.position(window, node.getBoundingClientRect());
	}
	window.addEventListener("resize", positionTooltip);

	if (typeof options === "string") {
		tooltip = new Tooltip(options, node, "center");
	} else {
		tooltip = new Tooltip(options.content, node, options.placement, options.pointer);
	}

	const unsub = readableStore(hoverStore(node), (hover) => {
		if (hover) tooltip.show();
		else tooltip.hide();
	});

	function stop() {
		window.removeEventListener("resize", positionTooltip);
		tooltip.unmount();
		unsub();
	}

	return {
		destroy() {
			stop();
		},
	};
}
