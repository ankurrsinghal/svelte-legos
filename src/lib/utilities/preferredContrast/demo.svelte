<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { preferredContrast } from "$lib";

const contrast = preferredContrast();
</script>

<DemoContainer>
	<div>
		<note class="mb-2">Preferred contrast:</note>
		<code>{$contrast}</code>
	</div>
</DemoContainer>
