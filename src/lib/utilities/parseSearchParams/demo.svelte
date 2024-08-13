<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { parseSearchParams } from "$lib";

const { params, updateParams } = parseSearchParams("history");
updateParams("foo", "bar");
updateParams("vueuse", "awesome");
</script>

<DemoContainer>
	<div>
		<ul class="!m-0">
			{#each Object.keys($params) as key}
				<li>
					{key}={$params[key]}
				</li>
			{/each}
		</ul>
	</div>
</DemoContainer>
