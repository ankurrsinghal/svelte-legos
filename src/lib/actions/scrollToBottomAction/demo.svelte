<script lang="ts">
import { scrollToBottomAction, shortcutAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

let messages: string[] = Array(10).fill(0).map((_, i) => new Date().toDateString());
let currentMessage = '';

function addMessage() {
  if (currentMessage.trim().length > 0) {
    messages = messages.concat([currentMessage]);
    currentMessage = '';
  }
}
</script>

<DemoContainer>
  <div
    class="bg-slate-200 h-60 overflow-auto rounded-md flex flex-col space-y-4 p-4 items-start"
    use:scrollToBottomAction
  >
    {#each messages as message}
      <div class="text-sm px-3 py-2 rounded-md bg-prime text-white">{message}</div>
    {/each}
  </div>
  <div class="mt-4">
    <input
      placeholder="Enter message and press enter"
      bind:value={currentMessage}
      use:shortcutAction={{ code: 'Enter', cb: addMessage }}
      class="px-2 py-1 border border-black rounded-md text-md min-w-[250px]"
    />
  </div>
</DemoContainer>
