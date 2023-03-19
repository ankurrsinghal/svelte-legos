<script lang="ts">
import { networkStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import Text from "$lib/shared/components/Text.svelte";

const networkState = networkStore();

$: networkStateText = JSON.stringify($networkState, null, 2);
</script>

<DemoContainer>
	<p class="mb-4">Try toggling your network connectivity using Network in Devtools.</p>
	<Text>
		<pre class="text-sm">{networkStateText}</pre>
	</Text>
</DemoContainer>
