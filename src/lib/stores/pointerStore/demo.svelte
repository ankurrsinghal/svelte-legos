<script lang="ts">
import { pointerStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
const position = pointerStore();
</script>

<DemoContainer>
	<p>Move pointer to change the values</p>
	<div class="mt-4">
		<h1>X: {$position.x}</h1>
		<h1>Y: {$position.y}</h1>
	</div>
</DemoContainer>
