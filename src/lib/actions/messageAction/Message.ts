export default class Message {
  message: string;
  onUnmount?: () => void;

  private __container: HTMLDivElement;
  private __timer: ReturnType<typeof setTimeout> | undefined;

  constructor(message: string, onUnmount?: () => void) {
    this.message = message;
    this.__container = document.createElement("div");
    this.onUnmount = onUnmount;
    this.init();
  }

  private init() {
    this.addStyles();
    this.addMessage();

    this.__timer = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  show() {
    this.__container.style.setProperty("transform", "translateY(0)");
    this.__container.style.setProperty("opacity", "1");
  }

  hide() {
    const end = () => {
      this.__container.removeEventListener("transitionend", end);
      this.unmount();
    };
    requestAnimationFrame(() => {
      this.__container.addEventListener("transitionend", end);
      this.__container.style.setProperty("opacity", "0");
      this.__container.style.setProperty("transform", "translateY(-100%)");
    });
  }

  unmount() {
    this.__container.remove();
    if (this.onUnmount) this.onUnmount();
  }

  private addMessage() {
    const message = document.createElement("h2");
    const messageStyles = `
        font-size: 13px;
        color: #303133;
        margin: 0;
      `;
    message.textContent = this.message;
    message.setAttribute("style", messageStyles);
    this.__container.appendChild(message);

    const closeBtn = document.createElement("div");
    const closeBtnStyles = `
        cursor: pointer;
        font-size: 12px;
      `;
    closeBtn.textContent = "╳";
    closeBtn.setAttribute("style", closeBtnStyles);

    closeBtn.addEventListener("click", () => {
      clearTimeout(this.__timer);
      this.hide();
    });

    this.__container.appendChild(message);
  }

  mount(container: HTMLDivElement) {
    container.appendChild(this.__container);
  }

  private addStyles() {
    const styles = `
        width: 330px;
        padding: 12px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        background-color: #eee;
        transition: opacity .3s, transform .3s;
        overflow-wrap: anywhere;
        overflow: hidden;
        z-index: 9999;
        transform: translateY(-100%);
        pointer-events: all;
        margin-bottom: 16px;
        opacity: 0;
      `;
    this.__container.setAttribute("style", styles);
  }
}
