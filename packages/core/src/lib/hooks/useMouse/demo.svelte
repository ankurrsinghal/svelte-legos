<script lang="ts">
  import { useMouse } from '$lib/hooks/useMouse';
  const position = useMouse();
</script>

<div>
  <h1>{$position.x}</h1>
  <h1>{$position.y}</h1>
</div>