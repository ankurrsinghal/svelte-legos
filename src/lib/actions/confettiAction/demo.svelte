<script>
import { confettiAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";
</script>

<DemoContainer>
  <div class="flex flex-col items-start space-y-4">
    <button
      class={PrimaryButtonClassName}
      use:confettiAction
    >
      Confetti
    </button>

    <button
      class={PrimaryButtonClassName}
      use:confettiAction={{ type: 'school-pride' }}
    >
      School Pride
    </button>
  </div>
</DemoContainer>
