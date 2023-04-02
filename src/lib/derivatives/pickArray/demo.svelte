<script lang="ts">
import { pickArray } from "$lib/derivatives";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { writable } from "svelte/store";

const data = writable([
	{
		name: "Svelte",
		author: "Rich",
		createdAt: Date.now(),
	},
	{
		name: "Vue",
		author: "Evan",
		createdAt: Date.now(),
	},
]);

const names = pickArray(data, "name");

const namesAndAuthors = pickArray(data, "name", "author");
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
{JSON.stringify($names, null, 2)}
				</pre>
		</div>

		<div>
			Picked Data 'name' and 'author':
			<pre class="text-sm mt-2">
{JSON.stringify($namesAndAuthors, null, 2)}
				</pre>
		</div>
	</div>
</DemoContainer>
