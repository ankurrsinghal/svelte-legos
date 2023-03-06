<script>
  import '../app.css';
	import Header from "./Header.svelte";
</script>

<div class="bg-gray-50">
  <Header />
  <main class="pt-16 w-screen min-h-[100vh]">
    <div class="container mx-auto">
      <slot />
    </div>
  </main>
</div>
