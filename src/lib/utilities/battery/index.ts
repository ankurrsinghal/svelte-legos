import { defaultWindow } from "$lib/shared";
import { eventListenerStore } from "$lib/stores/eventListenerStore";
import { readable } from "svelte/store";

export interface BatteryManager extends EventTarget {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
}

type NavigatorWithBattery = Navigator & {
	getBattery: () => Promise<BatteryManager>;
};

export function battery() {
	const events = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];

	let isSupported = false;
	let charging = false;
	let chargingTime = 0;
	let dischargingTime = 0;
	let level = 1;
	let battery: BatteryManager | null;

	function updateBatteryInfo(this: BatteryManager) {
		charging = this.charging;
		chargingTime = this.chargingTime || 0;
		dischargingTime = this.dischargingTime || 0;
		level = this.level;
	}

	return readable({ isSupported, charging, chargingTime, dischargingTime, level }, (set) => {
		isSupported = !!(
			defaultWindow &&
			defaultWindow.navigator &&
			"getBattery" in defaultWindow.navigator
		);
		if (isSupported) {
			(navigator as NavigatorWithBattery).getBattery().then((_battery) => {
				battery = _battery;
				updateBatteryInfo.call(battery);
				set({ isSupported, charging, chargingTime, dischargingTime, level });
				for (const event of events)
					eventListenerStore(battery, event, updateBatteryInfo, { passive: true });
			});
		}
	});
}
