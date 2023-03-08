<script lang="ts">
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { actionHover } from "$lib";

  function handleHover(e: CustomEvent<{ hover: boolean }>) {
    alert(`Box hovered: ${e.detail.hover}`);
  }
</script>

<DemoContainer>
  <div
    class="w-20 h-20 rounded-lg bg-prime text-sm flex items-center justify-center text-white"
    use:actionHover
    on:hover={handleHover}
  >
    Hover me
  </div>
</DemoContainer>
