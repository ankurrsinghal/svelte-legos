<script lang="ts">
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { actionHover } from "$lib";
  import Text from "$lib/shared/components/Text.svelte";

  let text = "No!";
  function handleHover(e: CustomEvent<{ hover: boolean }>) {
    text = e.detail.hover ? "Yes!" : "No!";
  }
</script>

<DemoContainer>
  <div
    class="w-20 h-20 mb-4 rounded-lg bg-prime text-sm flex items-center justify-center text-white"
    use:actionHover
    on:hover={handleHover}
  >
    Hover me
  </div>
  <Text>Mouse in the element: <span class="text-prime">{text}</span></Text>
</DemoContainer>
