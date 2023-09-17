<script lang="ts">
export let data;
</script>

<div class="py:20 lg:py-36 container mx-auto p-8">
	<h1 class="text-2xl lg:text-4xl font-bold">
		{#if data.q}Results for <i class="text-prime">{data.q}</i> ({data.totalResults})
		{:else}Search{/if}
	</h1>
	<form>
		<input
			class="mt-4 px-3 py-1 text-lg border border-slate-600 rounded-md bg-slate-100 w-full"
			type="text"
			name="q"
			placeholder="Search Svelte Legos"
			value={data.q}
		/>
	</form>
	{#if data.totalResults}
		<ul class="mt-4 space-y-4">
			{#each Object.entries(data.results) as [category, results]}
				{#each results as result}
					<li>
						<a href="/guides/{category}/{result}" class="hover:text-prime">
							{result}
						</a>
					</li>
				{/each}
			{/each}
		</ul>
	{/if}
</div>
