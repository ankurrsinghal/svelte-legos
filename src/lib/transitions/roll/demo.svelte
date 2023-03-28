<script>
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { roll } from "$lib";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let isVisible = true;
let delay = 0;
let duration = 600;
let direction = "top";
</script>

<DemoContainer>
	<div class="mb-8">
		<div class="flex items-center space-x-2">
			<label for="delay">Delay:</label>
			<input type="range" bind:value={delay} min={0} step={100} max={1000} />
			<span>{delay}ms</span>
		</div>
		<div class="flex items-center space-x-2 mt-4">
			<label for="distance">Duration:</label>
			<input type="range" bind:value={duration} min={100} step={100} max={1000} />
			<span>{duration}ms</span>
		</div>
		<div class="flex items-center space-x-2 mt-4">
			<label for="distance">Direction:</label>
			<select bind:value={direction} class="py-1 px-2 border border-black rounded-md">
				<option>top</option>
				<option>bottom</option>
				<option>left</option>
				<option>right</option>
			</select>
		</div>
	</div>
	<div>
		<label class={PrimaryButtonClassName} for="is-visible">{isVisible ? "Hide" : "Show"}</label>
		<input class="opacity-0 hidden" id="is-visible" type="checkbox" bind:checked={isVisible} />
	</div>
	<br />
	<div class="w-28 h-28">
		{#if isVisible}
			<div
				transition:roll|local={{ delay, duration, direction }}
				class="w-28 h-28 bg-prime text-sm text-white p-4 flex items-center justify-center"
			/>
		{/if}
	</div>
</DemoContainer>
