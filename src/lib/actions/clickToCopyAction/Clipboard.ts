export class ClipboardManager {
	private static __instance: ClipboardManager;

	private __proxyElement: HTMLInputElement | undefined;

	private constructor() {}

	static getInstance() {
		if (!this.__instance) this.__instance = new ClipboardManager();
		return this.__instance;
	}

	copyToClipboard(text: string): Promise<void> {
		if ("clipboard" in navigator) {
			return navigator.clipboard.writeText(text);
		} else {
			if (!this.__proxyElement) {
				const el = document.createElement("input");
				el.type = "text";
				el.disabled = true;
				el.id = "__SVELTE_LEGOS_CLIPBOARD_PROXY_ELEMENT";

				el.style.setProperty("position", "fixed");
				el.style.setProperty("z-index", "-100");
				el.style.setProperty("pointer-events", "none");
				el.style.setProperty("opacity", "0");
				document.body.append(el);

				this.__proxyElement = el;
			} else {
				this.__proxyElement.value = text;
				this.__proxyElement.click();
				this.__proxyElement.select();
				document.execCommand("copy");
			}
		}

		return Promise.resolve();
	}
}
