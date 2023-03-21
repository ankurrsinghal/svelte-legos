<script lang="ts">
import { elementSizeStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let ref: HTMLElement | null = null;

$: size = elementSizeStore(ref);
$: stringify = `width: ${$size.width}\nheight: ${$size.height}`;
</script>

<DemoContainer>
	<p class="mb-4">Resize the box to see changes</p>
	<textarea
		bind:this={ref}
		bind:value={stringify}
		class="resize p-4 min-w-[100%] min-h-[100px] lg:min-w-[320px] lg:min-h-[100px] rounded-md"
	/>
</DemoContainer>
