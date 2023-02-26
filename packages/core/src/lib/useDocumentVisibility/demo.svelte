<script lang="ts">
  import { useMouse } from './index';
  const position = useMouse();
</script>

<div>
  <h1>{$position.x}</h1>
  <h1>{$position.y}</h1>
</div>