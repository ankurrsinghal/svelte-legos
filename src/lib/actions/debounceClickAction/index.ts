import { eventListenerStore } from "$lib/stores/eventListenerStore";
import { timeoutFnStore } from "$lib/stores/timeoutFnStore";

interface DebounceClickActionParams {
	duration: number;
	onClick: (e: MouseEvent) => void;
}

export function debounceClickAction<T extends HTMLElement>(
	node: T,
	{ duration, onClick }: DebounceClickActionParams
) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = ({ duration, onClick }: DebounceClickActionParams) => {
		destroy();

		const { start, stop: stopTimer } = timeoutFnStore(onClick, duration, { immediate: false });
		async function handleClick(e: MouseEvent) {
			start(e);
		}

		const { stop: stopClickEventListener } = eventListenerStore("click", handleClick, node);

		stop = () => {
			stopTimer();
			stopClickEventListener();
		};
	};

	update({ duration, onClick });

	return {
		update,
		destroy,
	};
}
