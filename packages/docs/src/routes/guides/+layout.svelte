<script>
  /** @type {import('./$types').LayoutData} */
	export let data;
  console.log(data);
</script>

<div>
	<section class="fixed top-0 w-80 bg-slate-300 h-screen" />
	<section class="pl-80">
    {JSON.stringify(data, null, 4)}
		<slot />
	</section>
</div>
