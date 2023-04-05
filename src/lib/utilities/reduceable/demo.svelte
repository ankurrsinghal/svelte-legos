<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { reduceable } from "$lib";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";

function reducer(state: number, action: string) {
	switch (action) {
		case "inc":
			return state + 1;
		case "dec":
			return state - 1;
		default:
			return state;
	}
}

const counter = reduceable(reducer, 0);
</script>

<DemoContainer>
	<div>
		<h1 class="text-2xl">{$counter}</h1>
	</div>
	<div class="mt-4 space-x-4">
		<PrimaryButton on:click={() => counter.dispatch("inc")}>+</PrimaryButton>
		<PrimaryButton on:click={() => counter.dispatch("dec")}>-</PrimaryButton>
	</div>
</DemoContainer>
