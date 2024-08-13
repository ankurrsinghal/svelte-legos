<script lang="ts">
export let value: boolean;
</script>

<div>
	{#if value}
		<span class="text-green-700">Yes</span>
	{:else}
		<span class="text-red-700">No</span>
	{/if}
</div>
