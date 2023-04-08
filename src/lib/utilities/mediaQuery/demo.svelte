<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { mediaQuery } from "$lib";

const isLargeScreen = mediaQuery("(min-width: 1024px)");
const prefersDark = mediaQuery("(prefers-color-scheme: dark)");
</script>

<DemoContainer>
	<div>
		<div class="flex items-center space-x-3">
			<div>isLargeScreen:</div>
			<div>{$isLargeScreen}</div>
		</div>
		<div class="flex items-center space-x-3">
			<div>prefersDark:</div>
			<div>{$prefersDark}</div>
		</div>
	</div>
</DemoContainer>
