<script lang="ts">
import { useElementBounding } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let ref: HTMLElement | null = null;

let rect = null;
$: ref !== null && (rect = useElementBounding(ref));
$: stringify = JSON.stringify($rect, null, 4);
</script>

<DemoContainer>
  <textarea bind:this={ref} class="p-2 resize min-h-[250px] min-w-[250px]">
{stringify}
  </textarea>
</DemoContainer>
