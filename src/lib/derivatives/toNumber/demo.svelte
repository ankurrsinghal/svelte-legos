<script lang="ts">
import { toNumber } from "$lib/derivatives";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { InputClass } from "$lib/shared/tailwind";
import { writable } from "svelte/store";

const str = writable("1.0");
const number = toNumber(str);
</script>

<DemoContainer>
	<div>
		<input class={InputClass} bind:value={$str} />
		<div class="mt-4 text-xl">Result: <span class="text-prime">{$number}</span></div>
	</div>
</DemoContainer>
