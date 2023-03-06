<script lang="ts">
  import { useWindowScroll } from '$lib/hooks/useWindowScroll';
	import DemoContainer from '$lib/shared/components/DemoContainer.svelte';

  const position = useWindowScroll();
</script>

<div class="scroll-container">
  <div>
    <div class="inline-block">
      <DemoContainer>
        See scroll values in the lower right corner of the screen.
      </DemoContainer>
    </div>
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