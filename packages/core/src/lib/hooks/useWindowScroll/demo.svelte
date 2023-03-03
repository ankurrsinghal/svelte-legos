<script lang="ts">
  import { useWindowScroll } from '$lib/hooks/useWindowScroll';
  const position = useWindowScroll();
</script>

<div>
  <h1>{$position.x}</h1>
  <h1>{$position.y}</h1>
</div>