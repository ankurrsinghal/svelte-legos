type Undefineable<T> = T | undefined;

type SetupType = {
	styles: CSSStyleDeclaration;
	minRows: Undefineable<number | string>;
	maxRows: Undefineable<number | string>;
};

const PROXY_TEXTAREA_ELEMENT_HIDDEN_STYLE = `
  height: 0 !important;
  visibility: hidden !important;
  overflow: hidden !important;
  position: absolute !important;
  z-index: -1000 !important;
  top: 0 !important;
  right: 0 !important;
  pointer-events: none !important;
  opacity: 0 !important;
`;

const CONTEXT_STYLE = [
	"letter-spacing",
	"line-height",
	"padding-top",
	"padding-bottom",
	"font-family",
	"font-weight",
	"font-size",
	"text-rendering",
	"text-transform",
	"width",
	"text-indent",
	"padding-left",
	"padding-right",
	"border-width",
	"box-sizing",
];

function parseNumber(value: number | string | undefined) {
	if (value) {
		if (typeof value === "string") {
			const parsedValue = Number.parseInt(value, 10);
			if (!Number.isNaN(value)) {
				return parsedValue;
			}
		}

		if (typeof value === "number") return value;
	}

	return 0;
}

function getSizingData(styles: CSSStyleDeclaration) {
	const boxSizing = styles.getPropertyValue("box-sizing");
	const paddingSize =
		Number.parseFloat(styles.getPropertyValue("padding-bottom")) +
		Number.parseFloat(styles.getPropertyValue("padding-top"));
	const borderSize =
		Number.parseFloat(styles.getPropertyValue("border-bottom-width")) +
		Number.parseFloat(styles.getPropertyValue("border-top-width"));

	return { boxSizing, paddingSize, borderSize };
}

function isBorderBox(boxSizing: string) {
	return boxSizing === "border-box";
}

function isContentBox(boxSizing: string) {
	return boxSizing === "content-box";
}

class ProxyTextareaElement {
	static _proxyTextareaElement: HTMLTextAreaElement | undefined = undefined;

	_element: HTMLTextAreaElement | undefined = undefined;
	_minRows = 0;
	_maxRows = 0;
	_minHeightFromResizeObserver = 0;
	_sourceStyles: Undefineable<CSSStyleDeclaration> = undefined;
	_hasDragStarted = false;
	_lastCalculatedHeight = 0;
	_probablyResizeHappen = false;
	hasStarted = false;

	__onpointerdown = (e: PointerEvent) => {
		this._element!.setPointerCapture(e.pointerId);
		this._hasDragStarted = true;
	};

	__onpointermove = () => {
		this._probablyResizeHappen = true;
	};

	__onpointerup = (e: PointerEvent) => {
		this._element!.releasePointerCapture(e.pointerId);
		this._hasDragStarted = false;
		if (this._probablyResizeHappen) {
			const newHeight = parseNumber(this._element!.style.getPropertyValue("height"));
			if (!Number.isNaN(newHeight) && newHeight !== this._lastCalculatedHeight) {
				this._minHeightFromResizeObserver = newHeight;
			}
		}

		this._probablyResizeHappen = false;
	};

	__setup({ styles, maxRows, minRows }: SetupType) {
		this._sourceStyles = styles;
		this._maxRows = parseNumber(maxRows);
		this._minRows = parseNumber(minRows);

		this._element!.addEventListener("pointerdown", this.__onpointerdown);
		this._element!.addEventListener("pointermove", this.__onpointermove);
		this._element!.addEventListener("pointerup", this.__onpointerup);

		// setup proxy textarea element
		// if not present
		if (ProxyTextareaElement._proxyTextareaElement === undefined) {
			ProxyTextareaElement._proxyTextareaElement = document.createElement("textarea");
			const contextStyle = CONTEXT_STYLE.map(
				(name) => `${name}:${styles.getPropertyValue(name)}`
			).join(";");

			ProxyTextareaElement._proxyTextareaElement.setAttribute(
				"style",
				`${contextStyle};${PROXY_TEXTAREA_ELEMENT_HIDDEN_STYLE}`
			);

			if (
				ProxyTextareaElement._proxyTextareaElement.parentNode === null ||
				ProxyTextareaElement._proxyTextareaElement.parentNode !== document.body
			) {
				document.body.appendChild(ProxyTextareaElement._proxyTextareaElement);
			}
		}
	}

	__updateText(text: string) {
		ProxyTextareaElement._proxyTextareaElement!.value = text;
	}

	__getComputedHeight() {
		const { boxSizing, paddingSize, borderSize } = getSizingData(this._sourceStyles!);
		let finalHeight = ProxyTextareaElement._proxyTextareaElement!.scrollHeight;

		if (isBorderBox(boxSizing)) {
			finalHeight += borderSize;
		} else if (isContentBox(boxSizing)) {
			finalHeight -= paddingSize;
		}

		if (this._maxRows !== 0 || this._minRows !== 0) {
			ProxyTextareaElement._proxyTextareaElement!.value = "";
			const singleRowHeight =
				ProxyTextareaElement._proxyTextareaElement!.scrollHeight - paddingSize;
			if (this._minRows !== 0) {
				let minHeight = singleRowHeight * this._minRows;
				if (isBorderBox(boxSizing)) {
					minHeight += paddingSize + borderSize;
				}

				finalHeight = Math.max(finalHeight, minHeight);
			}

			if (this._maxRows !== 0) {
				let maxHeight = singleRowHeight * this._maxRows;
				if (isBorderBox(boxSizing)) {
					maxHeight += paddingSize + borderSize;
				}

				finalHeight = Math.min(finalHeight, maxHeight);
			}
		}

		finalHeight = Math.max(finalHeight, this._minHeightFromResizeObserver);

		this._lastCalculatedHeight = finalHeight;
		return finalHeight;
	}

	start(element: HTMLTextAreaElement, minRows?: number, maxRows?: number) {
		if (this.hasStarted) return;
		this._element = element;
		const sourceStyles = getComputedStyle(element);
		this.__setup({
			styles: sourceStyles,
			maxRows,
			minRows,
		});
		this.hasStarted = true;
	}

	onUpdateText(text: string) {
		this.__updateText(text);
		this._element!.style.setProperty("height", this.__getComputedHeight() + "px");
	}

	cleanUp() {
		this._element?.removeEventListener("pointerdown", this.__onpointerdown);
		this._element?.removeEventListener("pointermove", this.__onpointermove);
		this._element?.removeEventListener("pointerup", this.__onpointerup);
		ProxyTextareaElement._proxyTextareaElement?.remove();
		ProxyTextareaElement._proxyTextareaElement = undefined;
	}
}

export default ProxyTextareaElement;
