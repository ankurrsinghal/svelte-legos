<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { takeUntil } from "$lib";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { writable } from "svelte/store";

const counter = writable(0);
const moreThan10 = takeUntil(counter, (counter) => counter < 10);
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
	<div>
		<div class="text-sm">Take until counter is less than 10:</div>
		<div class="text-xl">
			{$moreThan10}
		</div>
	</div>
</DemoContainer>
