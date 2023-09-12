<script lang="ts">
import { dateStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
	<p>The date is {$dateStore}</p>
</DemoContainer>
