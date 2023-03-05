<script lang="ts">
import { useWindowSize } from '$lib/hooks/useWindowSize';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';

const size = useWindowSize();
</script>

<DemoContainer>
  <div>
    {$size.width} X {$size.height}
  </div>
  <br />
  <div>
    Try resizing <span class="font-mono">(Cmd + (-/+))</span>
  </div>
</DemoContainer>