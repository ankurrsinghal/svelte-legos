<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { battery } from "$lib";

const data = battery();
</script>

<DemoContainer>
	<div>
		<div class="flex items-center space-x-3">
			<div>Is Charging?:</div>
			<div>{$data.charging ? "Yes" : "No"}</div>
		</div>
		<div class="flex items-center space-x-3">
			<div>Battery Remaining</div>
			<progress max={1} value={$data.level} />
			<div>{$data.level * 100}%</div>
		</div>
		<div class="flex items-center space-x-3">
			<div>Discharging Time:</div>
			<div>{$data.dischargingTime} seconds</div>
		</div>
		<div class="flex items-center space-x-3">
			<div>Charging Time:</div>
			<div>{$data.chargingTime} seconds</div>
		</div>
	</div>
</DemoContainer>
