<script lang="ts">
  export let icon: string;
  export let title: string;
  export let description: string;
</script>

<div class="text-second rounded-lg bg-white p-6 lg:p-10 border border-slate-200">
  <p class="text-2xl lg:text-3xl mb-4">{icon}</p>
	<h2 class="text-xl font-bold lg:text-3xl">{title}</h2>
	<p class="mt-2 lg:mt-4">{description}</p>
</div>
