<script lang="ts">
import { sort } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { writable } from "svelte/store";

const data = writable([1, 5, 6, 2, 9, 6, 7, 8]);
const sorted = sort(data);
</script>

<DemoContainer>
	<div>
		<div>
			Array data:
			<pre class="text-sm mt-2">
{JSON.stringify($data)}
				</pre>
		</div>

		<div>
			Sorted data:
			<pre class="text-sm mt-2">
{JSON.stringify($sorted)}
				</pre>
		</div>
	</div>
</DemoContainer>
