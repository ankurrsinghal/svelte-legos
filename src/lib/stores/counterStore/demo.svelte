<script lang="ts">
import { counterStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";

const { counter, inc, dec, set, reset } = counterStore();
</script>

<DemoContainer>
  <div>Counter: {$counter}</div>
  <div class="mt-6 flex flex-col items-start space-y-2">
    <PrimaryButton on:click={() => inc()}>Increment</PrimaryButton>
    <PrimaryButton on:click={() => dec()}>Decrement</PrimaryButton>
    <PrimaryButton on:click={() => inc(5)}>Increment (+5)</PrimaryButton>
    <PrimaryButton on:click={() => dec(5)}>Decrement (-5)</PrimaryButton>
    <PrimaryButton on:click={() => set(100)}>Set (100)</PrimaryButton>
    <PrimaryButton on:click={() => reset()}>Reset</PrimaryButton>
  </div>
</DemoContainer>