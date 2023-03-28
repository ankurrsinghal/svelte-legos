<script>
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { rotate } from "$lib";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let isVisible = true;
</script>

<DemoContainer>
	<div>
		<label class={PrimaryButtonClassName} for="is-visible">{isVisible ? "Hide" : "Show"}</label>
		<input class="opacity-0 hidden" id="is-visible" type="checkbox" bind:checked={isVisible} />
	</div>
	<br />
	{#if isVisible}
		<div transition:rotate class="w-20 h-20 bg-prime rounded-md" />
	{/if}
</DemoContainer>
