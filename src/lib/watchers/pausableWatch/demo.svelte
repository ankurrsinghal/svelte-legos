<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { pausableWatch } from "$lib";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { writable } from "svelte/store";
import { InputClass } from "$lib/shared/tailwind";

let input: HTMLInputElement | null = null;
let log = "";
const source = writable("");

const { isActive, pause, resume, stop } = pausableWatch(
	source,
	(v) => (log += `Changed to "${v}"\n`)
);

function clear() {
	log = "";
}
function onPause() {
	log += "Paused\n";
	pause();
}
function onResume() {
	log += "Resumed\n";
	resume();
}
</script>

<DemoContainer>
	<div class="space-y-2">
		<note class="mb-2"> Type something below to trigger the watch </note>
		<br />
		<input class={InputClass} bind:this={input} bind:value={$source} type="text" />
		<br />
		<br />
		<PrimaryButton disabled={!$isActive} class="orange" on:click={onPause}>Pause</PrimaryButton>
		<PrimaryButton disabled={$isActive} on:click={onResume}>Resume</PrimaryButton>
		<PrimaryButton on:click={clear}>Clear Log</PrimaryButton>

		<br />
		<br />

		<note>Log</note>

		<pre>{log}</pre>
	</div>
</DemoContainer>
