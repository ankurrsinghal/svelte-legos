<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { preferredLanguages } from "$lib";

const languages = preferredLanguages();
</script>

<DemoContainer>
	<div>
		<note class="mb-4">Preferred Languages:</note>
		<div class="flex space-x-4">
			{#each $languages as lang (lang)}
				<code>{lang}</code>
			{/each}
		</div>
	</div>
</DemoContainer>
