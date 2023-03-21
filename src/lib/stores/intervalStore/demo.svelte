<script lang="ts">
import { intervalStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import Text from "$lib/shared/components/Text.svelte";

const counter = intervalStore(200);
</script>

<DemoContainer>
	<Text>
		{$counter}
	</Text>
</DemoContainer>
