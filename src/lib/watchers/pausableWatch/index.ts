import { tryOnDestroy, writableToReadable } from "$lib/shared";
import { writable, type Readable, get } from "svelte/store";

type CallbackFunction<T> = (newValue: T, oldVal: T) => void;

interface WatcherParams {
	immediate?: boolean;
}

export function pausableWatch<T>(
	store: Readable<T>,
	callback: CallbackFunction<T>,
	params: WatcherParams = {}
) {
	const { immediate = false } = params;
	let times = 0;
	let oldVal: T;
	let stopped = false;
	let isActive = writable(true);

	function pause() {
		!stopped && isActive.set(false);
	}

	function resume() {
		!stopped && isActive.set(true);
	}

	const __stop = store.subscribe((value) => {
		if (immediate && times === 0 && get(isActive)) {
			callback(value, oldVal);
		} else if (times > 0 && get(isActive)) {
			callback(value, oldVal);
		}
		oldVal = value;
		times++;
	});

	function stop() {
		stopped = true;
		__stop();
	}

	tryOnDestroy(stop);

	return { pause, resume, stop, isActive: writableToReadable(isActive) };
}
