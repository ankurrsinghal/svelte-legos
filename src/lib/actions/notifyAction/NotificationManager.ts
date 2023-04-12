import { append, attr, element } from "svelte/internal";
import Notification, { type NotificationType } from "./Notification";

export default class NotificationManager {
	private static __instance: NotificationManager;
	private __container: HTMLDivElement | undefined;

	private constructor() {}

	createContainer() {
		if (this.__container) return;
		const container = element("div");
		const containerStyles = `
        padding-top: 16px;
        position: fixed;
        width: 346px;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 100000;
      `;
		attr(container, "style", containerStyles);
		this.__container = container;
		append(document.body, this.__container)
	}

	createNotification(
		title: string,
		description?: string,
		type?: NotificationType,
		duration?: number | undefined
	) {
		this.createContainer();
		const notification = new Notification(
			title,
			description,
			() => {
				this.checkAndUnmount();
			},
			type,
			duration
		);

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
		if (!this.__instance) this.__instance = new NotificationManager();
		return this.__instance;
	}
}
