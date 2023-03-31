<script>
import { messageAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";

let message = "Here is your message!";
let type;
</script>

<DemoContainer>
	<div class="mb-4">
		<label class="mr-4" for="message">Message Contents:</label>
		<input
			id="message"
			class="px-3 py-2 border border-black rounded-md text-md"
			bind:value={message}
		/>
	</div>
	<div class="mb-4">
		<label class="mr-2">
			<input type="radio" name="type" value="success" bind:group={type} />
			Success
		</label>
		<label class="mr-2">
			<input type="radio" name="type" value="error" bind:group={type} />
			Error
		</label>
		<label class="mr-2">
			<input type="radio" name="type" value="warning" bind:group={type} />
			Warning
		</label>
		<label class="mr-2">
			<input type="radio" name="type" value="info" bind:group={type} />
			Info (default)
		</label>
	</div>
	<button
		class={PrimaryButtonClassName}
		use:messageAction={{
			message,
			type,
		}}
	>
		Show Message
	</button>
</DemoContainer>
