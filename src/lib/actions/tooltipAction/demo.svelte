<script>
import { tooltipAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
	<div class="space-y-4">
		<div class="space-x-8">
			<button
				class="bg-white border border-slate-600 py-2 px-3 rounded-md"
				use:tooltipAction={{ content: "left tooltip content", placement: "left" }}
			>
				top-left
			</button>
			<button
				class="bg-white border border-slate-600 py-2 px-3 rounded-md"
				use:tooltipAction={{ content: "Tooltip Content", placement: "center" }}
			>
				center
			</button>
			<button
				class="bg-white border border-slate-600 py-2 px-3 rounded-md"
				use:tooltipAction={{ content: "Tooltip Content", placement: "right" }}
			>
				right
			</button>
		</div>
		<div class="space-x-8">
			<button
				class="bg-white border border-slate-600 py-2 px-3 rounded-md"
				use:tooltipAction={{ content: "Tooltip Content", placement: "left", pointer: false }}
			>
				without pointer
			</button>
		</div>
	</div>
</DemoContainer>
