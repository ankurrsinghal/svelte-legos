<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { useHover } from "$lib";
import Text from "$lib/shared/components/Text.svelte";

let ref: HTMLDivElement | null = null;

$: isHover = useHover(ref);
</script>

<DemoContainer>
  <div class="w-20 h-20 rounded-lg bg-prime mb-4" bind:this={ref} />
  <Text>Mouse in the element: <span class="text-prime">{$isHover}</span></Text>
</DemoContainer>
