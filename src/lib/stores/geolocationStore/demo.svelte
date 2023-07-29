<script lang="ts">
import { geolocationStore } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";

const geolocation = geolocationStore({ watch: true });
$: ({ status, position, error } = $geolocation);
</script>

<DemoContainer>
	<div class="mb-2">Status: {status}</div>
	<div class="mb-2">Latitude: {position?.coords.latitude}</div>
	<div class="mb-2">Longitude: {position?.coords.longitude}</div>
	<div>Error: {JSON.stringify(error)}</div>
</DemoContainer>
