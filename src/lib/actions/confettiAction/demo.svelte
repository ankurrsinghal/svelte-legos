<script>
import { confettiAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";
</script>

<DemoContainer>
  <div>
    <button
      class={PrimaryButtonClassName}
      use:confettiAction
    >
      Fire
    </button>
  </div>
</DemoContainer>
