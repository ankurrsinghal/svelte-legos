<script lang="ts">
import { onDestroy, onMount } from "svelte";

let dots = ["."];

let interval: any;
onMount(() => {
	clearInterval(interval);
	interval = setInterval(() => {
		if (dots.length > 4) {
			dots = ["."];
		} else {
			dots = dots.concat(["."]);
		}
	}, 300);
});

onDestroy(() => {
	clearInterval(interval);
});
</script>

<span class="w-5 inline-block">
	{#each dots as dot}
		<span>{dot}</span>
	{/each}
</span>
