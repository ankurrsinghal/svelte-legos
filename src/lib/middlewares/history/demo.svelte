<script lang="ts">
import { history } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { writable } from "svelte/store";

const counter = history(writable(0));
</script>

<DemoContainer>
	<div>
		<div>
			<PrimaryButton on:click={counter.history.undo}>Undo</PrimaryButton>
			<PrimaryButton on:click={counter.history.redo}>Redo</PrimaryButton>
		</div>
		<div class="text-4xl my-8">
			{$counter}
		</div>
		<div>
			<PrimaryButton on:click={() => $counter++}>Increment</PrimaryButton>
		</div>
	</div>
</DemoContainer>
