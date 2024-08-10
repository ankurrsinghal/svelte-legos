import { eventListenerStore } from "$lib/stores/eventListenerStore";

export interface UseDropZoneOptions {
	/**
	 * Allowed data types, if not set, all data types are allowed.
	 * Also can be a function to check the data types.
	 */
	dataTypes?: string[] | ((types: readonly string[]) => boolean);
	onDrop?: (files: File[] | null, event: DragEvent) => void;
	onEnter?: (files: File[] | null, event: DragEvent) => void;
	onLeave?: (files: File[] | null, event: DragEvent) => void;
	onOver?: (files: File[] | null, event: DragEvent) => void;
}

export function dropAction<T extends HTMLElement>(
	target: T,
	options: UseDropZoneOptions | UseDropZoneOptions["onDrop"] = {}
) {
	let stopDragEnter: () => void;
	let stopDragOver: () => void;
	let stopDragLeave: () => void;
	let stopDrop: () => void;

	const destroy = () => {
		stopDragEnter && stopDragEnter();
		stopDragOver && stopDragOver();
		stopDragLeave && stopDragLeave();
		stopDrop && stopDrop();
	};

	const update = (options: UseDropZoneOptions | UseDropZoneOptions["onDrop"] = {}) => {
		let counter = 0;
		let isDataTypeIncluded = true;

		const _options = typeof options === "function" ? { onDrop: options } : options;
		const getFiles = (event: DragEvent) => {
			return Array.from(event.dataTransfer?.files ?? []);
		};

		({ stop: stopDragEnter } = eventListenerStore(
			"dragenter",
			(event: DragEvent) => {
				const types = Array.from(event?.dataTransfer?.items || [])
					.map((i) => (i.kind === "file" ? i.type : null))
					.filter((i) => i !== null);

				if (_options.dataTypes && event.dataTransfer) {
					const dataTypes = _options.dataTypes;
					isDataTypeIncluded =
						typeof dataTypes === "function"
							? dataTypes(types)
							: dataTypes
							? dataTypes.some((item) => types.includes(item))
							: true;
					if (!isDataTypeIncluded) return;
				}
				event.preventDefault();
				counter += 1;
				target.dispatchEvent(new CustomEvent("over-drop-zone"));
				_options.onEnter?.(getFiles(event), event);
			},
			target
		));
		({ stop: stopDragEnter } = eventListenerStore(
			"dragover",
			(event: DragEvent) => {
				if (!isDataTypeIncluded) return;
				event.preventDefault();
				_options.onOver?.(getFiles(event), event);
			},
			target
		));
		({ stop: stopDragEnter } = eventListenerStore(
			"dragleave",
			(event: DragEvent) => {
				if (!isDataTypeIncluded) return;
				event.preventDefault();
				counter -= 1;
				if (counter === 0) target.dispatchEvent(new CustomEvent("leave-drop-zone"));
				_options.onLeave?.(getFiles(event), event);
			},
			target
		));
		({ stop: stopDragEnter } = eventListenerStore(
			"drop",
			(event: DragEvent) => {
				event.preventDefault();
				counter = 0;
				target.dispatchEvent(new CustomEvent("leave-drop-zone"));
				_options.onDrop?.(getFiles(event), event);
			},
			target
		));
	};

	update(options);

	return {
		update,
		destroy,
	};
}
