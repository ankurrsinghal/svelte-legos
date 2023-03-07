<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements'
import { PrimaryButtonClassName } from '../tailwind';

interface $$Props extends HTMLButtonAttributes {}
</script>

<button
  {...$$props}
  on:click
  class={PrimaryButtonClassName}
  >
  <slot />
</button>
