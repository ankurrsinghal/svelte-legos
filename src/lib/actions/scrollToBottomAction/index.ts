export function scrollToBottomAction<T extends HTMLElement>(node: T, immediate = true) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = () => {
		destroy();

		function mutationCallback() {
			const { clientHeight, scrollHeight } = node;
			if (scrollHeight > clientHeight) {
				if (node.scrollTo) {
					node.scrollTo({
						behavior: "smooth",
						top: scrollHeight,
					});
				} else {
					node.scrollTop = scrollHeight;
				}
			}
		}

		const mutationObserver = new MutationObserver(mutationCallback);
		mutationObserver.observe(node, { childList: true, subtree: true });

		if (immediate) mutationCallback();
	};

	update();

	return {
		update,
		destroy,
	};
}
