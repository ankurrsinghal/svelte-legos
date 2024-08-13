import { defaultWindow } from "$lib/shared";
import { createSingletonPromise } from "$lib/shared/utils/utils";
import { readable } from "svelte/store";

type DescriptorNamePolyfill =
	| "accelerometer"
	| "accessibility-events"
	| "ambient-light-sensor"
	| "background-sync"
	| "camera"
	| "clipboard-read"
	| "clipboard-write"
	| "gyroscope"
	| "magnetometer"
	| "microphone"
	| "notifications"
	| "payment-handler"
	| "persistent-storage"
	| "push"
	| "speaker"
	| "local-fonts";

export type GeneralPermissionDescriptor = PermissionDescriptor | { name: DescriptorNamePolyfill };

export function hasPermission(
	permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor["name"]
) {
	return readable<PermissionState | undefined>(undefined, (set) => {
		const isSupported =
			defaultWindow && defaultWindow.navigator && "permissions" in defaultWindow.navigator;
		let permissionStatus: PermissionStatus | undefined;

		const desc =
			typeof permissionDesc === "string"
				? ({ name: permissionDesc } as PermissionDescriptor)
				: (permissionDesc as PermissionDescriptor);

		const onChange = () => {
			if (permissionStatus) set(permissionStatus.state);
		};

		function cleanup() {
			if (!permissionStatus) return;
			if ("removeEventListener" in permissionStatus)
				permissionStatus.removeEventListener("change", onChange);
		}

		const query = createSingletonPromise(async () => {
			if (!isSupported) return;
			if (!permissionStatus) {
				try {
					permissionStatus = await navigator!.permissions.query(desc);
					permissionStatus.addEventListener("change", onChange);
					onChange();
				} catch {
					set("prompt");
				}
			}
			return permissionStatus;
		});

		query();

		return cleanup;
	});
}
