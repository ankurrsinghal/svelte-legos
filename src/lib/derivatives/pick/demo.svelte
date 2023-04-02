<script lang="ts">
import { pick } from "$lib/derivatives";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { writable } from "svelte/store";

const data = writable({
	name: "Svelte",
	author: "Rich",
	createdAt: Date.now(),
});

const pickData = pick(data, "name");

const nameAndAuthor = pick(data, "name", "createdAt");
</script>

<DemoContainer>
	<div>
		<div>
			Store data:
			<pre class="text-sm mt-2">
{JSON.stringify($data, null, 2)}
			</pre>
		</div>

		<div>
			Picked Data 'name':
			<pre class="text-sm mt-2">
{JSON.stringify($pickData, null, 2)}
			</pre>
		</div>

		<div>
			Picked Data 'name' and 'createdAt':
			<pre class="text-sm mt-2">
{JSON.stringify($nameAndAuthor, null, 2)}
			</pre>
		</div>
	</div>
</DemoContainer>
