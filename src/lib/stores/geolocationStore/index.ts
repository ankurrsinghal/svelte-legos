import { readable } from "svelte/store";

type GeolocationStatus =
	| "unstarted"
	| "unsupported"
	| "requesting"
	| "unpermitted"
	| "loading"
	| "error"
	| "active";

interface GeolocationState {
	status: GeolocationStatus;
	position: GeolocationPosition | null;
	error: GeolocationPositionError | null;
}

interface GeolocationOptions extends PositionOptions {
	watch: boolean;
}

async function getPermission() {
	const perm = await navigator.permissions.query({ name: "geolocation" });
	if (perm.state !== "prompt") {
		return perm.state === "granted";
	}
	return true;
}

function getPosition(opts: PositionOptions) {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, opts);
	});
}

const initialState = {
	status: "unstarted",
	position: null,
	error: null,
} satisfies GeolocationState;

export function geolocationStore({ watch, ...options }: GeolocationOptions = { watch: false }) {
	return readable<GeolocationState>(initialState, (set, update) => {
		const navigator = typeof window !== "undefined" ? window.navigator : null;
		let cancelled = false;
		let watcher: number;
		if (!(navigator && "geolocation" in navigator)) {
			return update((state) => ({ ...state, status: "unsupported" }));
		}
		const getGeoPosition = async () => {
			if (cancelled) return;
			update((state) => ({ ...state, status: "requesting" }));
			const permitted = await getPermission();
			if (!permitted) {
				return update((state) => ({ ...state, status: "unpermitted" }));
			}
			update((state) => ({ ...state, status: "loading" }));
			try {
				const position = await getPosition(options);
				set({ status: "active", position, error: null });
			} catch (error) {
				if (error instanceof GeolocationPositionError) {
					const status = error.code === error.PERMISSION_DENIED ? "unpermitted" : "error";
					return set({ status, position: null, error });
				}
			}
			if (watch) {
				watcher = navigator.geolocation.watchPosition(
					(position) => set({ status: "active", position, error: null }),
					(error) => set({ status: "error", position: null, error }),
					options
				);
			}
		};
		getGeoPosition();
		return () => {
			cancelled = true;
			if (watcher) {
				navigator.geolocation.clearWatch(watcher);
			}
		};
	});
}
