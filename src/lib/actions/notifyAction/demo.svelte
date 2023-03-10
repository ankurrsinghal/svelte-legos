<script>
  import { notifyAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";
</script>

<DemoContainer>
  <button
    class={PrimaryButtonClassName}
    use:notifyAction={{
      title: "Title",
      description: "You can put your little description here.",
    }}
  >
    Notify
  </button>
</DemoContainer>
