<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { screenOrientation } from "$lib";

const data = screenOrientation();
$: ({ isSupported, orientation, angle } = $data);
</script>

<DemoContainer>
	<div>
		<note class="mb-2">
			For best results, please use a mobile or tablet device (or use your browser's native inspector
			to simulate an orientation change)
		</note>
		<div>
			isSupported: <boolean-display :value="isSupported">
				{isSupported}
			</boolean-display>
		</div>
		<div>Orientation Type: <b>{orientation}</b></div>
		<div>Orientation Angle: <b>{angle}</b></div>
	</div>
</DemoContainer>
