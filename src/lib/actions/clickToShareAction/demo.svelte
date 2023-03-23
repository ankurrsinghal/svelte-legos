<script>
import { clickToShareAction } from "./index";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let text = "Text to share";
let url = "https://svelte-legos.singhalankur.com/";
let title = "svelte-legos"
</script>

<DemoContainer>
	<div>
		<input class="px-3 py-2 border border-black rounded-md text-md mb-4" bind:value={text} />
	</div>
	<div>
		<button
			class={PrimaryButtonClassName}
			use:clickToShareAction={{text, url, title}}
		>
			Click to share
		</button>
	</div>
</DemoContainer>
