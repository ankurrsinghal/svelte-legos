<script lang="ts">
import { elementVisibilityStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let ref: HTMLElement | null = null;

$: ({ isVisible } = elementVisibilityStore(ref));
</script>

<div class="relative">
  <DemoContainer>
    <div bind:this={ref} class="max-w-100 p-4 z-20 relative area bg-white dark:bg-gray-800 shadow-lg z-60 rounded-md">
      Target Element (scroll down)
    </div>
    <div class="mt-4 h-[1000px]">
      <p>
        Scroll the window and watch element status in the bottom right corner.
      </p>
      <p>
        Info on the right bottom corner
      </p>
    </div>
  </DemoContainer>
  <div class="fixed bottom-3 right-3 shadow-lg">
    <DemoContainer>
      Element is
      <span class="text-prime">{$isVisible ? 'inside' : 'outside'}</span>
      the viewport
    </DemoContainer>
  </div>
</div>