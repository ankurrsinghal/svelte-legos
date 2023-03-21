<script>
import { longPressAction, messagesStore, timeoutFnStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let duration = 2000;
function handleLongPress() {
	messagesStore("Pressed!");
}
</script>

<DemoContainer>
	<label>
		<input type="range" bind:value={duration} max={2000} step={100} />
		{duration}ms
	</label>

	<div class="my-4">
		<button
			class={PrimaryButtonClassName}
			use:longPressAction={duration}
			on:longpress={handleLongPress}
		>
			press and hold
		</button>
	</div>
</DemoContainer>
