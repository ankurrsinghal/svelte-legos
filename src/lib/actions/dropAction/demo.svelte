<script lang="ts">
import { dropAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let filesData: { name: string; size: number; type: string; lastModified: number }[] = [];

function onDrop(files: File[] | null) {
	filesData = [];
	if (files) {
		filesData = files.map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
		}));
	}
}

let isOverDropZone = false;
</script>

<DemoContainer>
	<div
		use:dropAction={{ onDrop }}
		on:over-drop-zone={() => (isOverDropZone = true)}
		on:leave-drop-zone={() => (isOverDropZone = false)}
		class="flex flex-col w-full min-h-[200px] h-auto bg-gray-400/10 justify-center items-center rounded p-8 {isOverDropZone &&
			'border-4 border-blue-700 border-dashed'}"
	>
		<div class="font-bold text-2xl">DropZone</div>
		<div class="flex self-start flex-col space-y-2 mt-4">
			{#each filesData as file}
				<div class="w-200px bg-black-200/10 ma-2 pa-6">
					<p>Name: {file.name}</p>
					<p>Size: {file.size}</p>
					<p>Type: {file.type}</p>
					<p>Last modified: {file.lastModified}</p>
				</div>
			{/each}
		</div>
	</div>
</DemoContainer>
