<script lang="ts">
import { eyeDropperStore } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import PrimaryButton from '$lib/shared/components/PrimaryButton.svelte';

const { open, color } = eyeDropperStore('white');
</script>

<DemoContainer>
  <PrimaryButton on:click={open}>
    Open EyeDropper
  </PrimaryButton>

  <div class="mt-4 w-60 h-20 rounded-md flex items-center justify-center p-4 text-sm" style:background={$color}>
    Color will appear here.
  </div>
</DemoContainer>
