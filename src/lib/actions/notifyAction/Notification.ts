export default class Notification {
  title: string;
  description?: string;
  onUnmount?: () => void;

  private __container: HTMLDivElement;
  private __timer: ReturnType<typeof setTimeout> | undefined;

  constructor(title: string, description?: string, onUnmount?: () => void) {
    this.title = title;
    this.description = description;
    this.__container = document.createElement("div");
    this.onUnmount = onUnmount;
    this.init();
  }

  private init() {
    this.addStyles();
    this.addHeader();
    if(this.description) this.addDescription();

    this.__timer = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  show() {
    this.__container.style.setProperty("transform", "translateX(0)");
  }

  hide() {
    const end = () => {
      this.__container.removeEventListener("transitionend", end);
      this.unmount();
    };
    requestAnimationFrame(() => {
      this.__container.addEventListener("transitionend", end);
      this.__container.style.setProperty("opacity", "0");
    });
  }

  unmount() {
    this.__container.remove();
    if (this.onUnmount) this.onUnmount();
  }

  private addHeader() {
    const header = document.createElement("div");
    const headerStyles = `
        display: flex;
        align-items: center;
        justify-content: space-between;
      `;
    header.setAttribute("style", headerStyles);

    const title = document.createElement("h2");
    const titleStyles = `
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #303133;
        margin: 0;
      `;
    title.textContent = this.title;
    title.setAttribute("style", titleStyles);
    header.appendChild(title);

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

    header.appendChild(closeBtn);

    this.__container.appendChild(header);
  }

  private addDescription() {
    const description = document.createElement("p");
    const descriptionStyles = `
        margin-top: 16px;
        font-size: 13px;
      `;
    description.textContent = this.description;
    description.setAttribute("style", descriptionStyles);
    this.__container.appendChild(description);
  }

  mount(container: HTMLDivElement) {
    container.appendChild(this.__container);
  }

  private addStyles() {
    const styles = `
        width: 330px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        background-color: #ffffff;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
        transition: opacity .3s, transform .3s;
        overflow-wrap: anywhere;
        overflow: hidden;
        z-index: 9999;
        transform: translateX(calc(100% + 16px));
        pointer-events: all;
        margin-bottom: 16px;
      `;
    this.__container.setAttribute("style", styles);
  }
}
