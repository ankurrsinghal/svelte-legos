<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="p-8 pb-20">
  <div>
    <h1 class="text-2xl lg:text-4xl font-bold">{data.hookName}</h1>
    <p class="mt-4">
      {data.meta.description}
    </p>
  </div>
  <div class="my-20">
    <h1 class="text-xl lg:text-2xl">Demo</h1>
    <div>
      <slot />
    </div>
  </div>
  <div class="my-20">
    <h1 class="text-xl lg:text-2xl">Usage</h1>
    {#if data.code}
      <div class="p-4 text-sm overflow-auto">
        <pre>
          <code>
{@html data.code}
          </code>
        </pre>
      </div>
    {/if}
  </div>
  <div>
    <h1 class="text-xl lg:text-2xl mb-4">Code</h1>
    <ul class="flex space-x-4">
      <li>
        <a
          class="bg-prime px-4 py-2 text-white rounded-md text-sm hover:underline"
          href={data.sourceCodeURL}
          target="_blank"
          rel="noreferrer">Source</a
        >
      </li>
      <li>
        <a
          class="bg-prime px-4 py-2 text-white rounded-md text-sm hover:underline"
          href={data.demoCodeURL}
          target="_blank"
          rel="noreferrer">Demo</a
        >
      </li>
    </ul>
  </div>
</div>
