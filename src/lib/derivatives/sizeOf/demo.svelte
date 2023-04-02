<script lang="ts">
import { sizeOf } from "$lib/derivatives";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { writable } from "svelte/store";

const list = writable([1, 2, 3, 4, 5, 6]);
const set = writable(new Set([1, 2, 3, 4]));
const map = writable(
	new Map([
		[1, 3],
		[2, 4],
	])
);

const listSize = sizeOf(list);
const setSize = sizeOf(set);
const mapSize = sizeOf(map);
</script>

<DemoContainer>
	<div>
		<div>
			List Size: {$listSize}
			<pre class="text-sm mt-2">
{JSON.stringify($list)}
			</pre>
		</div>

		<div>
			Set Size: {$setSize}
			<pre class="text-sm mt-2">
{@html "{1, 2, 3, 4}"}
			</pre>
		</div>

		<div>
			Map Size: {$mapSize}
			<pre class="text-sm mt-2">
{@html "{1 => 3, 2 => 4}"}
			</pre>
		</div>
	</div>
</DemoContainer>
