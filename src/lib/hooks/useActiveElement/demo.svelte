<script lang="ts">
import { useActiveElement } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import Text from '$lib/shared/components/Text.svelte';

const activeElement = useActiveElement();

$: id = $activeElement?.id || 'null';
</script>

<DemoContainer>
  <Text>
    Select the inputs below to see the changes
  </Text>
  <div class="space-y-2 my-4 flex flex-col">
    {#each Array(4).fill(0) as el, index}
      <div>
        <input placeholder={`Input with id ${"input-" + (index + 1)}`} class="py-1 px-2 text-sm rounded-md border border-slate-500" id={"input-" + (index + 1)} />
      </div>
    {/each}
  </div>

  <Text>
    Current active element id: <span>{id}</span>
  </Text>
</DemoContainer>