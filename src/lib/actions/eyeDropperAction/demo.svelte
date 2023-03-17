<script>
  import { eyeDropperAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";

  let color = '';
</script>

<DemoContainer>
  <button
    class={PrimaryButtonClassName}
    use:eyeDropperAction={{
      onDone: (value) => (color = value),
      onError: console.log
    }}
  >
    Open EyeDropper
  </button>

  <div class="mt-4 w-60 h-20 rounded-md flex items-center justify-center p-4 text-sm bg-slate-400" style:background={color}>
    Color will appear here.
  </div>
</DemoContainer>
