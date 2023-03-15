<script lang="ts">
import { onlineStore } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import { PrimaryButtonClassName } from '$lib/shared/tailwind';

const isOnline = onlineStore();
</script>

<DemoContainer>
  <p class="mb-4">
    Try switching to offline using Network tab in Devtools or turning off your Wifi.
  </p>
  <div class="bg-white inline-block py-2 px-4 rounded-md">
    Is Online: <span class="{$isOnline ? "text-green-600" : "text-prime"}">{$isOnline}</span>
  </div>
</DemoContainer>