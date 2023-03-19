<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { hoverStore } from "$lib";
import Text from "$lib/shared/components/Text.svelte";

let ref: HTMLDivElement | null = null;

$: isHover = hoverStore(ref);
</script>

<DemoContainer>
	<div
		class="w-20 h-20 rounded-lg bg-prime mb-4 text-sm flex items-center justify-center text-white"
		bind:this={ref}
	>
		Hover me
	</div>
	<Text>Mouse in the element: <span class="text-prime">{$isHover}</span></Text>
</DemoContainer>
