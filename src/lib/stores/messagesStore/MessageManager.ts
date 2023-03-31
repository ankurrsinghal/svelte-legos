import Message, { type MessageType } from "./Message";

export default class MessageManager {
	private static __instance: MessageManager;
	private __container: HTMLDivElement | undefined;

	private constructor() {}

	createContainer() {
		if (this.__container) return;
		const container = document.createElement("div");
		const containerStyles = `
        padding-top: 16px;
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 50%;
        bottom: 0;
        z-index: 100000;
        transform: translateX(-50%);
      `;
		container.setAttribute("style", containerStyles);
		this.__container = container;
		document.body.appendChild(this.__container);
	}

	createMessage(message: string, type?: MessageType) {
		this.createContainer();
		const notification = new Message(message, type, () => {
			this.checkAndUnmount();
		});
		notification.mount(this.__container!);
		requestAnimationFrame(() => {
			notification.show();
		});
	}

	private checkAndUnmount() {
		if (this.__container) {
			if (this.__container.childElementCount === 0) {
				this.__container.remove();
				this.__container = undefined;
			}
		}
	}

	static getInstance() {
		if (!this.__instance) this.__instance = new MessageManager();
		return this.__instance;
	}
}
