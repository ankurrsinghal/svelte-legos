<script>
  import '../app.css';
	import Header from "./Header.svelte";
</script>

<div class="bg-gray-50">
  <Header />
  <main class="pt-16 container m-auto">
    <slot />
  </main>
</div>
