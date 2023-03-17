<script>
  import { messagesStore } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  let message = "Here is your message!";

  function handleClick() {
    messagesStore(message);
  }
</script>

<DemoContainer>
  <div class="mb-4">
    <label class="mr-4" for="message">Message Contents:</label>
    <input id="message" class="px-3 py-2 border border-black rounded-md text-md" bind:value={message} />
  </div>
  <button
    class={PrimaryButtonClassName}
    on:click={handleClick}
  >
    Show Message
  </button>
</DemoContainer>
