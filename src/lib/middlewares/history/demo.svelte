<script lang="ts">
import { history } from "$lib/middlewares";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { writable } from "svelte/store";

const counter = history(writable(0));
const { undo, redo, canRedo, canUndo } = counter.history;
</script>

<DemoContainer>
	<div>
		<div>
			<PrimaryButton disabled={!$canUndo} on:click={undo}>Undo</PrimaryButton>
			<PrimaryButton disabled={!$canRedo} on:click={redo}>Redo</PrimaryButton>
		</div>
		<div class="text-4xl my-8">
			{$counter}
		</div>
		<div>
			<PrimaryButton on:click={() => $counter++}>Increment</PrimaryButton>
		</div>
	</div>
</DemoContainer>
