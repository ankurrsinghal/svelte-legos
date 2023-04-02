/* this implementation is original ported from https://github.com/rigor789/vue-scrollto */

import scrollTo from "./scrollTo";
import _ from "./utils";

let bindings = []; // store binding data

function deleteBinding(el) {
	for (let i = 0; i < bindings.length; ++i) {
		if (bindings[i].el === el) {
			bindings.splice(i, 1);
			return true;
		}
	}
	return false;
}

function findBinding(el) {
	for (let i = 0; i < bindings.length; ++i) {
		if (bindings[i].el === el) {
			return bindings[i];
		}
	}
}

function getBinding(el) {
	let binding = findBinding(el);

	if (binding) {
		return binding;
	}

	bindings.push(
		(binding = {
			el: el,
			binding: {},
		})
	);

	return binding;
}

function handleClick(e) {
	const ctx = getBinding(this).binding;
	if (!ctx.value) return;

	e.preventDefault();

	if (typeof ctx.value === "string") {
		return scrollTo(ctx.value);
	}
	scrollTo(ctx.value.el || ctx.value.element, ctx.value);
}

const directiveHooks = {
	bind(el, binding) {
		getBinding(el).binding = binding;
		_.on(el, "click", handleClick);
	},
	unbind(el) {
		deleteBinding(el);
		_.off(el, "click", handleClick);
	},
	update(el, binding) {
		getBinding(el).binding = binding;
	},
};

interface ScrollToElementActionParams {}

export function scrollToElementAction<T extends HTMLElement>(
	node: T,
	params: ScrollToElementActionParams
) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (params: ScrollToElementActionParams) => {
		destroy();

		const selector = document.querySelector(params);

		stop = () => {
			directiveHooks.unbind(node);
		};
	};

	update(params);

	return {
		update,
		destroy,
	};
}
