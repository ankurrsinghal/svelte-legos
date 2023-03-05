<script lang="ts">
  import { useElementSize } from '$lib/hooks/useElementSize';
  import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
  
  const visibility = useElementSize();
  
  </script>
  
  <DemoContainer>
    {message}
  </DemoContainer>
  