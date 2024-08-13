<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { clipboard, hasPermission } from "$lib";
import PrimaryButton from "$lib/shared/components/PrimaryButton.svelte";
import { InputClass } from "$lib/shared/tailwind";

let value = "";
const board = clipboard({ read: true });
const permissionRead = hasPermission("clipboard-read");
const permissionWrite = hasPermission("clipboard-write");

$: isSupported = $board.isSupported;
$: copy = $board.copy;
$: copiedText = $board.text;
$: copied = $board.copied;
</script>

<DemoContainer>
	<div>
		{#if isSupported}
			<div class="space-y-2">
				<note>
					Clipboard Permission: read <b>{$permissionRead}</b> | write
					<b>{$permissionWrite}</b>
				</note>
				<p>
					Current copied: <code>{copiedText || "none"}</code>
				</p>
				<input class={InputClass} bind:value type="text" />
				<PrimaryButton on:click={() => copy(value)}>
					<!-- by default, `copied` will be reset in 1.5s -->
					{#if !copied}
						<span>Copy</span>
					{:else}
						<span>Copied!</span>
					{/if}
				</PrimaryButton>
			</div>
		{:else}
			<p>Your browser does not support Clipboard API</p>
		{/if}
	</div>
</DemoContainer>
