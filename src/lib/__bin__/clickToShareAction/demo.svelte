<script lang="ts">
import { clickToShareAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let filesText = "Text to share";
let urlText = "Text to share";
let filesTitle = "svelte-legos";
let urlTitle = "svelte-legos";
let url = "https://svelte-legos.singhalankur.com/";
let fileList: FileList;
let files: File[];
$: if (fileList) files = Array.from(fileList);
</script>

<DemoContainer>
	<div>
		<div>
			<label>
				Text
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="text"
					bind:value={filesText}
				/></label
			>
		</div>

		<div>
			<label>
				Title
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="text"
					bind:value={filesTitle}
				/></label
			>
		</div>
		<div>
			<label
				>Files
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="file"
					bind:files={fileList}
					multiple
				/></label
			>
		</div>

		<div>
			<button
				class={PrimaryButtonClassName}
				use:clickToShareAction={{ text: filesText, title: filesTitle, files }}
			>
				Click to share file
			</button>
		</div>
	</div>

	<div>
		<div>
			<label>
				Text
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="text"
					bind:value={urlText}
				/></label
			>
		</div>

		<div>
			<label>
				Title
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="text"
					bind:value={urlTitle}
				/></label
			>
		</div>

		<div>
			<label
				>URL
				<input
					class="px-3 py-2 border border-black rounded-md text-md mb-4"
					type="text"
					bind:value={url}
				/></label
			>
		</div>

		<div>
			<button
				class={PrimaryButtonClassName}
				use:clickToShareAction={{ text: urlText, title: urlTitle, url }}
			>
				Click to share url
			</button>
		</div>
	</div>
</DemoContainer>
