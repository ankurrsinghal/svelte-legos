<script lang="ts">
  export let title: string;
  export let description: string;
  export let bgClass: string;
</script>

<div class="text-second rounded-lg bg-slate-100 p-10 border border-slate-200">
	<h2 class="font-bold text-3xl">{title}</h2>
	<p class="mt-4">{description}</p>
</div>
