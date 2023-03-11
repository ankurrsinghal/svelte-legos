export default class Alert<T extends HTMLElement = HTMLElement> {
  private __container: HTMLDivElement;

  title: string;
  description: string;
  onClose?: () => void;
  onOk?: () => void;

  constructor(title: string, description: string, onClose?: () => void, onOk?: () => void) {
    this.title = title;
    this.description = description;
    this.onClose = onClose;
    this.onOk = onOk;

    const container = document.createElement("div");
    const containerStyles = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      pointer-events: none;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    `;
    container.setAttribute("style", containerStyles);

    this.__container = container;

    this.addDialog();
  }

  private addDialog() {
    const dialog = document.createElement("div");
    const dialogStyles = `
      width: 300px;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: white;
      pointer-events: all;
      display: flex;
      flex-direction: column;
    `;
    dialog.setAttribute("style", dialogStyles);

    this.addHeader(dialog);

    this.__container.appendChild(dialog);
  }

  private addHeader(dialog: HTMLDivElement) {
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
      this.onClose && this.onClose();
    });

    header.appendChild(closeBtn);

    const description = document.createElement("p");
    const descriptionStyles = `
      margin-top: 16px;
      font-size: 13px;
    `;
    description.textContent = this.description;
    description.setAttribute("style", descriptionStyles);
    this.__container.appendChild(description);

    const oKBtn = document.createElement("button");
    const oKBtnStyles = `
      cursor: pointer;
      font-size: 12px;
      margin-left: auto;
      background-color: #eee;
      padding: 6px 16px;
      border-radius: 8px;
      margin-top: 8px;
    `;
    oKBtn.textContent = "OK";
    oKBtn.setAttribute("style", oKBtnStyles);

    oKBtn.addEventListener("click", () => {
      this.onOk && this.onOk();
    });

    dialog.appendChild(header);
    dialog.appendChild(description);
    dialog.appendChild(oKBtn);
  }

  mount() {
    document.body.appendChild(this.__container);
  }

  unmount() {
    this.__container.remove();
  }
}
