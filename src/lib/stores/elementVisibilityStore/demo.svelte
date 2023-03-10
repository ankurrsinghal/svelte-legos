<script lang="ts">
import { elementVisibilityStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let ref: HTMLElement | null = null;

$: isVisible = elementVisibilityStore(ref);

// onMount(() => {
//   if (typeof window === "object") {
//     const mainContainer = window.document.getElementById('legos-main-container');
//     if (mainContainer) {
//       mainContainer.style.setProperty('width', '2000px');
//       mainContainer.style.setProperty('height', '2000px');
//     }
//   }
// })

// onDestroy(() => {
//   if (typeof window === "object") {
//     const mainContainer = window.document.getElementById('legos-main-container');
//     if (mainContainer) {
//       mainContainer.style.setProperty('height', 'initial');
//       mainContainer.style.setProperty('height', 'initial');
//     }
//   }
// })
</script>

<div class="inline-block relative">
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
  <div class="fixed bottom-3 right-3 shadow-lg">
    <DemoContainer>
      Element is
      <span class="text-prime">{$isVisible ? 'inside' : 'outside'}</span>
      the viewport
    </DemoContainer>
  </div>
</div>