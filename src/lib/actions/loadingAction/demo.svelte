<script>
import { loadingAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let loading = false;
</script>

<DemoContainer>
	<div class="mb-4">
		<label for="loading">Is Loading?</label>
		<input id="loading" type="checkbox" bind:checked={loading} />
	</div>
	<div
		class="w-full h-20 bg-prime rounded-md flex items-center justify-center text-white"
		use:loadingAction={loading}
	>
		Content
	</div>
</DemoContainer>
