<script lang="ts">
  import { memoryStore } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

  const memoryState = memoryStore();

  const size = (v: number) => {
    const kb = v / 1024 / 1024;
    return `${kb.toFixed(2)} MB`;
  };
</script>

<DemoContainer>
  {#if $memoryState.isSupported && $memoryState.memory}
    <div class="inline-grid grid-cols-2 gap-x-4 gap-y-2">
      <div>Used</div>
      <div>{size($memoryState.memory.usedJSHeapSize)}</div>
      <div>Allocated</div>
      <div>{size($memoryState.memory.totalJSHeapSize)}</div>
      <div>Limit</div>
      <div>{size($memoryState.memory.jsHeapSizeLimit)}</div>
    </div>
  {:else}
    <div>Your browser does not support performance memory API</div>
  {/if}
</DemoContainer>
