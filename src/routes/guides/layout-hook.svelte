<script lang="ts">
	import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="p-8">
  <div>
    <h1 class="text-4xl font-bold">{data.hookName}</h1>
    <p class="mt-4">
      {data.meta.description}
    </p>
  </div>
  <div class="my-10">
    <h1 class="text-2xl">Demo</h1>
    <div>
      <slot />
    </div>
  </div>
  <div class="my-10">
    <h1 class="text-2xl">Usage</h1>
    {#if data.code}
      <div class="p-4 text-sm">
        <pre>
          <code>
{@html data.code}
          </code>
        </pre>
      </div>
    {/if}
  </div>
</div>