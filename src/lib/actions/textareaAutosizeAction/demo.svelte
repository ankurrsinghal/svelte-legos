<script>
  import { textareaAutosizeAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  
</script>

<DemoContainer>
  <textarea placeholder="Auto resize textarea." class="min-w-[250px] p-4 border border-slate-400 rounded-md focus-visible:border-prime focus:border-prime focus-within:border-prime" use:textareaAutosizeAction />
</DemoContainer>