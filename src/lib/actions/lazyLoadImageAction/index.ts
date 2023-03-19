import { elementVisibilityStore } from "$lib/stores/elementVisibilityStore";
import type { Unsubscriber } from "svelte/store";

export function lazyLoadImageAction(node: HTMLImageElement) {
	if (!(node instanceof HTMLImageElement)) {
		throw new Error("Target element should be an image element");
	}

	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = () => {
		destroy();
		const store = elementVisibilityStore(node);

		let unsub: Unsubscriber | undefined;

		function handleVisibility(isVisible: boolean) {
			if (isVisible) {
				const url = node.getAttribute("data-src");
				if (url) {
					node.src = url;
				}
				unsub && unsub();
			}
		}

		unsub = store.isVisible.subscribe(handleVisibility);

		stop = () => {
			unsub && unsub();
			store.stop();
		};
	};

	update();

	return {
		update,
		destroy,
	};
}
