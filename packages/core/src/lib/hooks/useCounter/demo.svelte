<script lang="ts">
import { useCounter } from "$lib/hooks/useCounter";

const { counter, inc, dec, set, reset } = useCounter();
</script>

<div class="mt-8 border border-black p-4 rounded-md bg-slate-100">
  <div>Counter: {$counter}</div>
  <div class="mt-6 space-x-4">
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => inc()}>Increment</button>
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => dec()}>Decrement</button>
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => inc(5)}>Increment (+5)</button>
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => dec(5)}>Decrement (-5)</button>
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => set(100)}>Set (100)</button>
    <button class="text-sm bg-prime text-white px-4 py-2 rounded-md" on:click={() => reset()}>Reset</button>
  </div>
</div>