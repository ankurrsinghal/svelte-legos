import { eventListenerStore } from "$lib/stores/eventListenerStore";

interface ClickToShareActionParams {
	text: string;
	url: string;
	title: string;
}

export function clickToShareAction<T extends HTMLElement>(
	node: T,
	params: ClickToShareActionParams
) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (params: ClickToShareActionParams) => {
		destroy();

		async function handleClick() {
			try {
				await navigator.share({ text: params.text, url: params.url, title: params.title });
			} catch (error) {
				node.dispatchEvent(new CustomEvent("share-error", { detail: { error } }));
			}
		}

		({ stop } = eventListenerStore("click", handleClick, node));
	};

	update(params);

	return {
		update,
		destroy,
	};
}
