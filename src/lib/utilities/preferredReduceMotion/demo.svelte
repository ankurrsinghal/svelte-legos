<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { preferredReduceMotion } from "$lib";

const motion = preferredReduceMotion();
</script>

<DemoContainer>
	<div>
		<note class="mb-2"> Preferred Motion: </note>
		<code>{$motion}</code>
	</div>
</DemoContainer>
