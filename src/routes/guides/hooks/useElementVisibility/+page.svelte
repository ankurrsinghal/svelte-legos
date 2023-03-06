<script lang="ts">
import { useElementVisibility } from "$lib/hooks/useElementVisibility";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { onDestroy, onMount } from 'svelte';

let ref: HTMLElement | null = null;

$: isVisible = useElementVisibility(ref);

onMount(() => {
  if (typeof window === "object") {
    const mainContainer = window.document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.style.setProperty('width', '10000px');
      mainContainer.style.setProperty('height', '10000px');
    }
  }
})

onDestroy(() => {
  if (typeof window === "object") {
    const mainContainer = window.document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.style.setProperty('height', 'initial');
      mainContainer.style.setProperty('height', 'initial');
    }
  }
})
</script>

<div class="inline-block">
  <DemoContainer>
    <div class="mb-4">
      <p>
        Scroll the window in vertical and horizontal directions and watch element status in the bottom right corner.
      </p>
      <p>
        Info on the right bottom corner
      </p>
    </div>
    <div bind:this={ref} class="max-w-100 p-4 z-20 relative area bg-white dark:bg-gray-800 shadow-lg z-60 rounded-md">
      Target Element (scroll down)
    </div>
  </DemoContainer>
</div>

<div class="fixed bottom-3 right-3 shadow-lg">
  <DemoContainer>
    Element is
    {$isVisible ? 'inside' : 'outside'}
    the viewport
  </DemoContainer>
</div>