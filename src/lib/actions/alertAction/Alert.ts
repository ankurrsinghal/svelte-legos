import { element, append, attr } from "svelte/internal";

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

		const container = element("div");
		const containerStyles = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    `;

		attr(container, "style", containerStyles);

		this.__container = container;

		this.addDialog();
	}

	private addDialog() {
		const dialog = element("div");
		const dialogStyles = `
      width: 300px;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: white;
      display: flex;
      flex-direction: column;
    `;
		attr(dialog, "style", dialogStyles);

		this.addHeader(dialog);

		append(this.__container, dialog);
	}

	private addHeader(dialog: HTMLDivElement) {
		const header = element("div");
		const headerStyles = `
        display: flex;
        align-items: center;
        justify-content: space-between;
      `;
		attr(header, "style", headerStyles);

		const title = element("h2");
		const titleStyles = `
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #303133;
        margin: 0;
      `;
		title.textContent = this.title;
		attr(title, "style", titleStyles);
		append(header, title);

		const closeBtn = element("div");
		const closeBtnStyles = `
        cursor: pointer;
        font-size: 12px;
      `;
		closeBtn.textContent = "╳";
		attr(closeBtn, "style", closeBtnStyles);

		closeBtn.addEventListener("click", () => {
			this.onClose && this.onClose();
		});

		append(header, closeBtn)

		const description = element("p");
		const descriptionStyles = `
      margin-top: 16px;
      font-size: 13px;
    `;
		description.textContent = this.description;
		attr(description, "style", descriptionStyles);
		append(this.__container, description);

		const oKBtn = element("button");
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
		attr(oKBtn, "style", oKBtnStyles);

		oKBtn.addEventListener("click", () => {
			this.onOk && this.onOk();
		});

		append(dialog, header);
		append(dialog, description);
		append(dialog, oKBtn);
	}

	mount() {
		append(document.body, this.__container);
	}

	unmount() {
		this.__container.remove();
	}
}
