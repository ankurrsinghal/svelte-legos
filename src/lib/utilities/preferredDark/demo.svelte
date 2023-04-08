<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { preferredDark } from "$lib";

const prefersDark = preferredDark();
</script>

<DemoContainer>
	<div>
		<note class="mb-2">Prefers Dark:</note>
		<code>{$prefersDark}</code>
	</div>
</DemoContainer>
