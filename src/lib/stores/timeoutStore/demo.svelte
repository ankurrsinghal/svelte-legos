<script lang="ts">
import { timeoutStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";

const { ready, start } = timeoutStore(2000, { controls: true });
</script>

<DemoContainer>
	<p class="mb-4">Ready: {$ready}</p>
	<PrimaryButton disabled={!$ready} on:click={start}>Restart</PrimaryButton>
</DemoContainer>
