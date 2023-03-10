<script lang="ts">
  import { elementBoundingStore } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

  let ref: HTMLElement | null = null;

  let rect = null;
  $: ref !== null && (rect = elementBoundingStore(ref));
  $: stringify = JSON.stringify($rect, null, 4);
</script>

<DemoContainer>
  <div class="p-4">
    <textarea
      bind:this={ref}
      class="p-2 resize min-h-[250px] min-w-[250px] border border-slate-400 rounded-md"
    >
{stringify}
    </textarea>
  </div>
</DemoContainer>
