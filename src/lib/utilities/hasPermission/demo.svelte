<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { hasPermission } from "$lib";

const accelerometer = hasPermission("accelerometer");
const accessibilityEvents = hasPermission("accessibility-events");
const ambientLightSensor = hasPermission("ambient-light-sensor");
const backgroundSync = hasPermission("background-sync");
const camera = hasPermission("camera");
const clipboardRead = hasPermission("clipboard-read");
const clipboardWrite = hasPermission("clipboard-write");
const gyroscope = hasPermission("gyroscope");
const magnetometer = hasPermission("magnetometer");
const microphone = hasPermission("microphone");
const notifications = hasPermission("notifications");
const paymentHandler = hasPermission("payment-handler");
const persistentStorage = hasPermission("persistent-storage");
const push = hasPermission("push");
const speaker = hasPermission("speaker");
const localFonts = hasPermission("local-fonts");
</script>

<DemoContainer>
	<div class="space-y-1">
		<div>accelerometer: <span class="font-bold">{$accelerometer}</span></div>
		<div>accessibilityEvents: <span class="font-bold">{$accessibilityEvents}</span></div>
		<div>ambientLightSensor: <span class="font-bold">{$ambientLightSensor}</span></div>
		<div>backgroundSync: <span class="font-bold">{$backgroundSync}</span></div>
		<div>camera: <span class="font-bold">{$camera}</span></div>
		<div>clipboardRead: <span class="font-bold">{$clipboardRead}</span></div>
		<div>clipboardWrite: <span class="font-bold">{$clipboardWrite}</span></div>
		<div>gyroscope: <span class="font-bold">{$gyroscope}</span></div>
		<div>magnetometer: <span class="font-bold">{$magnetometer}</span></div>
		<div>microphone: <span class="font-bold">{$microphone}</span></div>
		<div>notifications: <span class="font-bold">{$notifications}</span></div>
		<div>paymentHandler: <span class="font-bold">{$paymentHandler}</span></div>
		<div>persistentStorage: <span class="font-bold">{$persistentStorage}</span></div>
		<div>push: <span class="font-bold">{$push}</span></div>
		<div>speaker: <span class="font-bold">{$speaker}</span></div>
		<div>localFonts: <span class="font-bold">{$localFonts}</span></div>
	</div>
</DemoContainer>
