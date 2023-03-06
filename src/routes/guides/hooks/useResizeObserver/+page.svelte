<script lang="ts">
import { useResizeObserver } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let ref: HTMLElement | null = null;

let width = 0;
let height = 0;

function handler([entry]: ResizeObserverEntry[]) {
  width = entry.contentRect.width;
  height = entry.contentRect.height;
}

$: ref && useResizeObserver(ref, handler);
$: stringify = `width: ${width}\nheight: ${height}`;
</script>

<DemoContainer>
  <p class="mb-4">
    Resize the box to see changes
  </p>
  <textarea bind:this={ref} bind:value={stringify} class="resize p-4 min-w-[100%] min-h-[100px] lg:min-w-[320px] lg:min-h-[100px] rounded-md" />
</DemoContainer>
