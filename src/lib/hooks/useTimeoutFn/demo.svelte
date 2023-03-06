<script lang="ts">
import { useTimeoutFn } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import PrimaryButton from '$lib/shared/components/PrimaryButton.svelte';

const defaultText = 'Please wait for 3 seconds';

let text = defaultText;

const { start, isPending } = useTimeoutFn(() => {
  text = 'Fired!';
}, 3000);

const restart = () => {
  text = defaultText;
  start()
};

</script>
  
<DemoContainer>
  <p class="mb-4">{text}</p>
  <PrimaryButton disabled={$isPending} on:click={restart}>
    Restart
  </PrimaryButton>
</DemoContainer>