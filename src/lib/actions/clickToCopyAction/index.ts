import { eventListenerStore } from "$lib/stores/eventListenerStore";
import { ClipboardManager } from "./Clipboard";

export function clickToCopyAction<T extends HTMLElement>(node: T, text: string) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (text: string) => {
		destroy();

		async function handleClick() {
			try {
				await ClipboardManager.getInstance().copyToClipboard(text);
				node.dispatchEvent(new CustomEvent("copy-done"));
			} catch (error) {
				node.dispatchEvent(new CustomEvent("copy-error", { detail: { error } }));
			}
		}

		({ stop } = eventListenerStore("click", handleClick, node));
	};

	update(text);

	return {
		update,
		destroy,
	};
}
