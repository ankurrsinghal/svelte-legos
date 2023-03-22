import { eventListenerStore } from "$lib/stores/eventListenerStore";
import type { NotificationType } from "./Notification";
import NotificationManager from "./NotificationManager";

interface NotifyActionParams {
	title: string;
	description?: string;
	type?: NotificationType | undefined;
	duration?: number | undefined;
}

export function notifyAction<T extends HTMLElement>(node: T, params: NotifyActionParams) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (params: NotifyActionParams) => {
		destroy();
		function handleClick() {
			NotificationManager.getInstance().createNotification(
				params.title,
				params.description,
				params.type,
				params.duration
			);
		}

		({ stop } = eventListenerStore("click", handleClick, node));
	};

	update(params);

	return {
		update,
		destroy,
	};
}
