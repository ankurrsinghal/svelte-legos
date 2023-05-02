import { listen } from "svelte/internal";
import type { ActionReturn } from "svelte/action";

interface Attributes {
	"on:clickoutside": (e: CustomEvent<void>) => void;
}

export function clickOutsideAction(node: HTMLElement): ActionReturn<{}, Attributes> {
	const handleClick = (event: Event) => {
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
