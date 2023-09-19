<script lang="ts">
export let data;

$: results = data.bricks.filter((brick) => {
	if (!data.query) return false;

	return brick.text.toLowerCase().includes(data.query.toLowerCase());
});
</script>

<div class="py:20 lg:py-36 container mx-auto p-8">
	<h1 class="text-2xl lg:text-4xl font-bold">
		{#if data.query}Results for <i class="text-prime">{data.query}</i> ({results.length})
		{:else}Search{/if}
	</h1>
	<form>
		<label for="query" class="sr-only">Search Query</label>
		<input
			class="mt-4 px-3 py-1 text-lg border border-slate-600 rounded-md bg-slate-100 w-full"
			type="text"
			name="query"
			placeholder="Search Svelte Legos"
			bind:value={data.query}
		/>
	</form>
	{#if results.length}
		<ul class="mt-4 space-y-4">
			{#each results as brick}
				{@const pre = brick.text.slice(
					0,
					brick.text.toLowerCase().indexOf(data.query.toLowerCase())
				)}

				{@const post = brick.text.substring(
					brick.text.toLowerCase().indexOf(data.query.toLowerCase()) + data.query.length
				)}

				{@const mid = brick.text.replace(pre, "").replace(post, "")}

				<li>
					<a href={brick.url} class="hover:text-prime">
						{pre}<span class="text-prime">{mid}</span>{post}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
