<script>
  import { documentTitleAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
  <input
    placeholder="Enter title here."
    use:documentTitleAction
    class="px-3 py-2 border border-black rounded-md text-md"
  />
</DemoContainer>
