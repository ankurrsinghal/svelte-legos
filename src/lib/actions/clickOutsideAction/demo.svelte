<script>
  import { clickOutsideAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
  import Text from "$lib/shared/components/Text.svelte";
  let showModal = true;
</script>

<DemoContainer>
  <PrimaryButton on:click={() => (showModal = true)}>Show Modal</PrimaryButton>
  {#if showModal}
    <div
      class="border border-black p-4 w-80 h-40 fixed top-1/2 left-1/2 bg-slate-300 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg"
      use:clickOutsideAction
      on:clickoutside={() => (showModal = false)}
    >
      <Text>
        Click outside me!
      </Text>
    </div>
  {/if}
</DemoContainer>