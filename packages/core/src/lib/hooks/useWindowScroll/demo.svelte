<script lang="ts">
  import { useWindowScroll } from '$lib/hooks/useWindowScroll';
	import { onMount } from 'svelte';
  const position = useWindowScroll();

  onMount(() => {
    if (typeof window === "object") {
      const mainContainer = window.document.getElementById('main-container');
      if (mainContainer) {
        mainContainer.style.setProperty('width', '10000px');
        mainContainer.style.setProperty('height', '10000px');
      }
    }
  })
</script>

<div class="scroll-container">
  <div class="mt-8">
    <p class="border border-black p-4 rounded-md bg-slate-100 inline-block">
      See scroll values in the lower right corner of the screen.
    </p>
  </div>
  <div class="position-view">
    <div>
      Scroll value:
    </div>
    <div>
      <div>X: {$position.x}</div>
      <div>Y: {$position.y}</div>
    </div>
  </div>
</div>

<style>
.position-view {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #ddd;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-direction: column;
}
</style>