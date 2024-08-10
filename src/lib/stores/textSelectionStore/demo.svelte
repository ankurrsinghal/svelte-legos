<script lang="ts">
import { textSelectionStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

const selectionStore = textSelectionStore();

$: text = $selectionStore.text;
$: rects = $selectionStore.rects;
$: selectedStyle = $selectionStore.text ? "text-primary" : "text-gray-400";
</script>

<DemoContainer>
	<div>
		<p class="font-600 text-blue-600">You can select any text on the page.</p>
		<p>
			<strong class="font-bold">Selected Text:</strong>
			<em class="whitespace-pre h-44 overflow-y-auto block {selectedStyle}"
				>{#if text}
					{text}
				{:else}
					No selected
				{/if}</em
			>
		</p>
		<div>
			<strong>Selected rects:</strong>
			<pre class="h-72" lang="json">{JSON.stringify(rects, null, 2)}</pre>
		</div>
	</div>
</DemoContainer>
