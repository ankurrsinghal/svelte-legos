<script>
  import { shortcutAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  let timesClicked = 0;
  let timesClickedCallback = 0;
</script>

<DemoContainer>
  <div class="flex items-center">
    <button
      class={PrimaryButtonClassName}
      use:shortcutAction={{ shift: true, code: 'Digit1' }}
      on:click={() => timesClicked++}
    >
      Triggers a click on Shift + 1
    </button>
    <p class="ml-4">
      Clicked: {timesClicked}
    </p>
  </div>
  <div class="flex items-center mt-4">
    <div
      class="inline-block text-sm px-4 py-2 rounded-md border border-black"
      use:shortcutAction={{ shift: true, meta: true, code: 'KeyX', cb: () => timesClickedCallback++ }}
      aria-hidden="true"
    >
      Triggers a callback on Shift + Cmd + X
  </div>
    <p class="ml-4">
      Clicked: {timesClickedCallback}
    </p>
  </div>
</DemoContainer>