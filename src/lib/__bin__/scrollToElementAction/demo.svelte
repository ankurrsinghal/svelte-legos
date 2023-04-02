<script lang="ts">
import { scrollToElementAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";
</script>

<DemoContainer>
	<div class="h-[200px] overflow-auto">
		<div class="h-[1000px] flex flex-col justify-between items-start">
			<div>
				<button use:scrollToElementAction={"#element"} class={PrimaryButtonClassName}
					>Scroll To element</button
				>
			</div>
			<h1 id="element" class="text-4xl mb-10">Hi. I'm element</h1>
		</div>
	</div>
</DemoContainer>
