<script lang="ts">
import { useRafFn } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";

let counter = 0;

function handler() {
  counter += 1;
}

const { pause, resume } = useRafFn(handler);
</script>

<DemoContainer>
  <div class="mb-4">
    {counter}
  </div>
  <div class="space-x-4">
    <PrimaryButton on:click={pause}>Pause</PrimaryButton>
    <PrimaryButton on:click={resume}>Resume</PrimaryButton>
  </div>
</DemoContainer>
