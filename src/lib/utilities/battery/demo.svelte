<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { battery } from "$lib";

const data = battery();
</script>

<DemoContainer>
	<pre><code>{JSON.stringify($data, null, 2)}</code></pre>
</DemoContainer>
