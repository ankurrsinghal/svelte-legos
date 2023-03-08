<script>
  import { actionTooltip } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
  <div use:actionTooltip={"Tooltip Content"}>
    Hover me
  </div>
</DemoContainer>