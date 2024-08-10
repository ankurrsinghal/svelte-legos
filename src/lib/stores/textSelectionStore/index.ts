import { defaultWindow } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { type Readable, readable } from "svelte/store";

function getRangesFromSelection(selection: Selection) {
	const rangeCount = selection.rangeCount ?? 0;
	return Array.from({ length: rangeCount }, (_, i) => selection.getRangeAt(i));
}

interface SelectionStoreProps {
	selection: Selection | null;
	text: string;
	ranges: Range[];
	rects: DOMRect[];
}

function getCurrentSelection(window?: Window): SelectionStoreProps {
	if (typeof window === "object" && "getSelection" in window) {
		const selection = window.getSelection();
		if (selection !== null) {
			const text = selection.toString();
			const ranges = getRangesFromSelection(selection);
			const rects = ranges.map((range) => range.getBoundingClientRect());
			return {
				selection,
				text,
				ranges,
				rects,
			};
		}
	}

	return {
		selection: null,
		text: "",
		ranges: [],
		rects: [],
	};
}

export function textSelectionStore({
	window = defaultWindow,
}: ConfigurableWindow = {}): Readable<SelectionStoreProps> {
	return readable(getCurrentSelection(window), (set) => {
		function onSelectionChange() {
			set(getCurrentSelection()); // trigger computed update
			if (window) set(getCurrentSelection(window));
		}

		if (window) {
			window.document.addEventListener("selectionchange", onSelectionChange);

			return () => {
				window.document.removeEventListener("visibilitychange", onSelectionChange);
			};
		}
	});
}
