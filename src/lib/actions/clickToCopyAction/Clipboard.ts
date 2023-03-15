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
        const element = document.createElement("input");
        element.type = "text";
        element.disabled = true;
        element.id = "__SVELTE_LEGOS_CLIPBOARD_PROXY_ELEMENT";

        element.style.setProperty("position", "fixed");
        element.style.setProperty("z-index", "-100");
        element.style.setProperty("pointer-events", "none");
        element.style.setProperty("opacity", "0");
        document.body.appendChild(element);

        this.__proxyElement = element;
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
