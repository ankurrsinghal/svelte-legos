import { tick } from "svelte";

export function portalAction<T extends HTMLElement>(
	element: T,
	target: HTMLElement | string = "body"
) {
	let targetEl: HTMLElement | null;
	const update = async (newTarget: HTMLElement | string) => {
		destroy();
		element.hidden = true;
		target = newTarget;
		if (typeof target === "string") {
			targetEl = document.querySelector(target);
			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector(target);
			}
			if (targetEl === null) {
				throw new Error(`No element found matching selector: "${target}"`);
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		} else {
			const targetType = target === null ? "null" : typeof target;
			throw new TypeError(
				`Unknown portal target type: ${targetType}. Allowed types: string (CSS selector) or HTMLElement.`
			);
		}
		targetEl.appendChild(element);
		element.hidden = false;
	};
	const destroy = () => {
		if (element.parentNode) {
			element.parentNode.removeChild(element);
		}
	};
	update(target);
	return {
		update,
		destroy,
	};
}
