<script lang="ts">
import { cssVarStore } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';

const bgColor = cssVarStore('--bg', { initialValue: 'white' });
</script>

<DemoContainer>
  <div class="mb-4">
    <div class="mb-2">Color Value for <span class="font-mono">--bg</span></div>
    <input bind:value={$bgColor} class="px-3 py-2 border border-black rounded-md text-md" />
  </div>
  <div class="w-60 h-20 rounded-md flex items-center justify-center p-4 text-sm" style:background="var(--bg)">
    <span class="font-mon">background: var(--bg)</span>
  </div>
</DemoContainer>