<script lang="ts">
	import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>
  <div>
    <slot />
  </div>
  <div class="p-4 text-sm">
    <pre>
      <code>
{@html data.code}
      </code>
    </pre>
  </div>
</div>