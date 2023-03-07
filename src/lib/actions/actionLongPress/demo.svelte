<script>
  import { actionLongPress, useTimeoutFn } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import Text from "$lib/shared/components/Text.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  let pressed = false;
  let duration = 2000;

  $: {
    if (pressed) {
      useTimeoutFn(() => {
        pressed = false;
      }, 1000)
    }
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
      use:actionLongPress={duration}
      on:longpress={() => (pressed = true)}
      on:mouseenter={() => (pressed = false)}
    >
      press and hold
    </button>
  </div>

  {#if pressed}
    <Text>
      congratulations, you pressed and held for {duration}ms
    </Text>
  {/if}
</DemoContainer>
