import { eventListenerStore } from "$lib/stores/eventListenerStore";

interface ClickToShareFilesActionParams {
	text: string;
	title: string;
	files: File[];
}

interface ClickToShareUrlActionParams {
	text: string;
	title: string;
	url: string;
}

type ClickToShareActionParams = ClickToShareUrlActionParams | ClickToShareFilesActionParams;

export function clickToShareAction<T extends HTMLElement>(
	node: T,
	params: ClickToShareActionParams
) {
	let stop: () => void;

	const destroy = () => {
		stop && stop();
	};

	const update = (params: ClickToShareActionParams) => {
		destroy();

		async function handleClick() {
			try {
				if ("canShare" in navigator) {
					// if browser supports navigator.share
					if ("url" in params) {
						// if a url is shared
						await navigator.share({
							text: params.text,
							title: params.title,
							url: params.url,
						});
					} else {
						// files are shared
						if (navigator.canShare({ files: params.files })) {
							// if browser supports sharing the files
							await navigator.share({
								text: params.text,
								title: params.title,
								files: params.files,
							});
						} else {
							throw new Error("Your system does not support sharing these files.");
						}
					}
				} else {
					throw new Error("Your system does not support the Web Share API.");
				}
			} catch (error) {
				node.dispatchEvent(new CustomEvent("share-error", { detail: { error } }));
			}
		}

		({ stop } = eventListenerStore("click", handleClick, node));
	};

	update(params);

	return {
		update,
		destroy,
	};
}
