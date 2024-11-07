import type { ActionReturn } from "svelte/action";

interface Attributes {
	"on:clickoutside"?: (e: CustomEvent<void>) => void;
}

type Callback = () => unknown

export function clickOutsideAction(node: HTMLElement, callback?: Callback): ActionReturn<{}, Attributes> {
	const handleClick = (event: Event) => {
		if (event.target !== null && !node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent("clickoutside"));
                        callback?.();
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
