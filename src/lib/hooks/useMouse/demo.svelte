<script lang="ts">
import { useMouse } from '$lib/hooks/useMouse';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
const position = useMouse();
</script>

<DemoContainer>
  <p>Move mouse to change the values</p>
  <div class="mt-4">
    <h1>X: {$position.x}</h1>
    <h1>Y: {$position.y}</h1>
  </div>
</DemoContainer>