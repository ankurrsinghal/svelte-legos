<script lang="ts">
import { useToggle } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";

const { toggle, on, off, value } = useToggle();

$: stringify = $value ? 'ON' : 'OFF';
</script>
  
<DemoContainer>
  <div>Value: {stringify}</div>
  <div class="mt-6 space-x-4">
    <PrimaryButton on:click={toggle}>Toggle</PrimaryButton>
    <PrimaryButton on:click={on}>Set On</PrimaryButton>
    <PrimaryButton on:click={off}>Set off</PrimaryButton>
  </div>
</DemoContainer>