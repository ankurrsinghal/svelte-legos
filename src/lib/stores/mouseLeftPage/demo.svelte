<script lang="ts">
import { mouseLeftPage } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

const hasLeft = mouseLeftPage();
</script>

<DemoContainer>
	<div>
		Mouse has left: {#if $hasLeft}
			<span class="text-green-700">Yes</span>
		{:else}
			<span class="text-red-700">No</span>
		{/if}
	</div>
</DemoContainer>
