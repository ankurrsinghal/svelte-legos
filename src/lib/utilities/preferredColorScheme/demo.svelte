<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { preferredColorScheme } from "$lib";

const colorScheme = preferredColorScheme();
</script>

<DemoContainer>
	<div>
		<note class="mb-2"> Preferred Color Scheme: </note>
		<code>{$colorScheme}</code>
	</div>
</DemoContainer>
