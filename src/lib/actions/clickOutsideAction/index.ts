import { listen } from "svelte/internal";

export function clickOutsideAction<T extends Element>(node: T) {
	const handleClick = (event: MouseEvent) => {
		if (event.target !== null && !node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent("clickoutside"));
		}
	};

	const stop = listen(document, "click", handleClick, true);

	return {
		destroy() {
			stop();
		},
	};
}
