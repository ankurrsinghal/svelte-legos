<script lang="ts">
import { mouseStore } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
const position = mouseStore();
</script>

<DemoContainer>
  <p>Move mouse to change the values</p>
  <div class="mt-4">
    <h1>X: {$position.x}</h1>
    <h1>Y: {$position.y}</h1>
  </div>
</DemoContainer>