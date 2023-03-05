<script>
  import '../app.css';
	import Header from "./Header.svelte";
</script>

<div class="bg-gray-50">
  <Header />
  <main class="pt-16 w-screen h-screen">
    <slot />
  </main>
</div>
