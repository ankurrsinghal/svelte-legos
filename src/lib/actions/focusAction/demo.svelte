<script>
  import { focusAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  let isFocused = true;
</script>

<DemoContainer>
  <div class="mb-4">
    <input class="px-3 py-2 border border-black rounded-md text-md" use:focusAction={isFocused} />
  </div>
  <button
    class={PrimaryButtonClassName}
    on:click={() => (isFocused = !isFocused)}
  >
    Toggle Focus
  </button>
</DemoContainer>