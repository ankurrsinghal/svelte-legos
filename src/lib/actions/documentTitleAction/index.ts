import { eventListenerStore } from "$lib/stores/eventListenerStore";

export function documentTitleAction(node: HTMLInputElement | HTMLTextAreaElement) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = () => {
		destroy();

		function handler() {
			document.title = node.value;
		}

		({ stop } = eventListenerStore("input", handler, node));
	};

	update();

	return {
		update,
		destroy,
	};
}
