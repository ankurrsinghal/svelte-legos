<script>
import { draggableAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
	<div
		class="w-20 h-20 rounded-lg bg-prime text-sm flex items-center justify-center text-white"
		use:draggableAction
	>
		Drag me
	</div>
</DemoContainer>
