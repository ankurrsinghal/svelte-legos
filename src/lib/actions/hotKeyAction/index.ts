import { isUndefined } from "$lib/shared/utils/utils";
import { eventListenerStore } from "$lib/stores/eventListenerStore";

interface ShortActionParams {
	shift: boolean;
	ctrl: boolean;
	alt: boolean;
	meta: boolean;
	cb: () => void;
	code: string;
}

const Keys: Array<keyof ShortActionParams> = ["alt", "code", "ctrl", "meta", "shift"];

type ShortActionParamsWithoutCB = Exclude<keyof ShortActionParams, "cb">;

const KeysToEventMap: Record<ShortActionParamsWithoutCB, keyof KeyboardEvent> = {
	alt: "altKey",
	meta: "metaKey",
	ctrl: "ctrlKey",
	shift: "shiftKey",
	code: "code",
};

export function hotKeyAction<T extends HTMLElement>(node: T, params: Partial<ShortActionParams>) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (params: Partial<ShortActionParams>) => {
		destroy();
		function handler(event: KeyboardEvent) {
			const definedKeys = Keys.filter(
				(key) => !isUndefined(params[key as keyof ShortActionParams])
			);
			const undefinedKeys = Keys.filter((key) =>
				isUndefined(params[key as keyof ShortActionParams])
			);

			function check(key: keyof ShortActionParams) {
				return (
					params[key] ===
					event[KeysToEventMap[key as ShortActionParamsWithoutCB] as keyof KeyboardEvent]
				);
			}

			if (
				definedKeys.every(check) &&
				!undefinedKeys.some((key) => !!event[KeysToEventMap[key as ShortActionParamsWithoutCB]])
			) {
				event.preventDefault();
				params.cb ? params.cb() : node.click();
			}
		}
		({ stop } = eventListenerStore("keydown", handler));
	};

	update(params);

	return {
		update,
		destroy,
	};
}
