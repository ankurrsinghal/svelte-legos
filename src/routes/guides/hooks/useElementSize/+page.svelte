<script lang="ts">
  import { useElementSize } from "$lib/hooks/useElementSize";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

  let ref: HTMLElement | null = null;

  $: size = useElementSize(ref);
  $: stringify = `width: ${$size.width}\nheight: ${$size.height}`;
</script>

<DemoContainer>
  <p class="mb-4">
    Resize the box to see changes
  </p>
  <textarea bind:this={ref} bind:value={stringify} class="resize p-4 min-w-[320px] min-h-[100px] rounded-md" />
</DemoContainer>
