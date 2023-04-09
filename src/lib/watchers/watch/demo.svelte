<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { watch } from "$lib";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { writable } from "svelte/store";

const counter = writable(0);
watch(counter, (counter) => {
	console.log(counter);
});
</script>

<DemoContainer>
	<div>
		<div class="text-sm">Store value:</div>
		<div class="text-xl">
			{$counter}
		</div>
	</div>
	<div class="my-4 space-x-4">
		<PrimaryButton on:click={() => $counter++}>+</PrimaryButton>
		<PrimaryButton on:click={() => $counter--}>-</PrimaryButton>
	</div>
	<div class="text-sm">(Check console)</div>
</DemoContainer>
