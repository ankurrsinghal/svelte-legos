<script lang="ts">
  import { debounceClickAction, messagesStore } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  function onClick() {
    messagesStore('Clicked!');
  }

  let duration = 1000;
</script>

<DemoContainer>
  <label>
    <input type="range" bind:value={duration} max={2000} step={100} />
    {duration}ms
  </label>

  <div class="my-4">
    <button
      class={PrimaryButtonClassName}
      use:debounceClickAction={{ duration, onClick }}
    >
      Click will fire after {duration}ms
    </button>
  </div>
</DemoContainer>
