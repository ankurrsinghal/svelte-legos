import { append, element, attr } from "svelte/internal";
export type NotificationType = "success" | "error" | "info" | "warning";
import { cross, error, info, success, warn } from "../../shared/icons";
export default class Notification {
	title: string;
	description?: string;
	type?: NotificationType | undefined;
	duration?: number;
	onUnmount?: () => void;

	private __container: HTMLDivElement;
	private __timer: ReturnType<typeof setTimeout> | undefined;

	constructor(
		title: string,
		description?: string,
		onUnmount?: () => void,
		type?: NotificationType | undefined,
		duration?: number | undefined
	) {
		this.title = title;
		this.description = description;
		this.__container = element("div");
		this.type = type;
		this.duration = duration ?? 4000;
		this.onUnmount = onUnmount;
		this.init();
	}

	private init() {
		this.addStyles();
		this.addHeader();
		if (this.description) this.addDescription();

		this.__timer = setTimeout(() => {
			this.hide();
		}, this.duration);
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
		const header = element("div");
		const headerStyles = `
        display: flex;
        align-items: center;
        justify-content: space-between;
      `;
		attr(header, "style", headerStyles);

		const iconTextContainer = element("div");
		const iconTextContainerStyles = `
        display: flex;
        align-items: center;
      `;
		attr(iconTextContainer, "style", iconTextContainerStyles);

		const icon = element("img");
		const iconStyles = `
        width: 20px;
        height: 20px;
        margin-right: 8px;
      `;
		switch (this.type) {
			case "success":
				attr(icon, "src", success);
				break;
			case "error":
				attr(icon, "src", error);
				break;
			case "info":
				attr(icon, "src", info);
				break;
			case "warning":
				attr(icon, "src", warn);
				break;
		}
		attr(icon, "style", iconStyles);

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

		if (this.type) append(iconTextContainer, icon);

		append(iconTextContainer, title);

		append(header, iconTextContainer);

		const closeBtn = element("img");
		const closeBtnStyles = `
        cursor: pointer;
        width: 16px;
      `;

		attr(closeBtn, "style", closeBtnStyles);
		attr(closeBtn, "src", cross);

		closeBtn.addEventListener("click", () => {
			clearTimeout(this.__timer);
			this.hide();
		});

		append(header, closeBtn);

		append(this.__container, header)
	}

	private addDescription() {
		const description = element("p");
		const descriptionStyles = `
        margin-top: 16px;
        font-size: 13px;
      `;
		description.textContent = this.description ?? "";
		attr(description, "style", descriptionStyles);
		append(this.__container, description);
	}

	mount(container: HTMLDivElement) {
		append(container, this.__container);
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
		attr(this.__container, "style", styles);
	}
}
