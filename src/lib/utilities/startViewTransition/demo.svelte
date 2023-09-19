<script lang="ts">
import { startViewTransition } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

startViewTransition();
</script>

<DemoContainer>
	<h1>View transitions will not be enabled</h1>
</DemoContainer>
