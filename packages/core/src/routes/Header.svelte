<script>
	import { base } from '$app/paths';
</script>

<section
	class="fixed top-0 h-16 w-screen after:absolute after:-bottom-1 after:h-1 after:w-full after:bg-gradient-to-b after:from-gray-100 after:via-gray-50 after:to-transparent z-10 bg-white"
>
  <nav class="container flex items-center justify-between h-full m-auto">
    <a href="/" class="flex items-center space-x-2">
      <span class="text-xl font-bold">SvelteUse</span>
    </a>
    <div>
      <input class="border-black" type="text" />
    </div>
    <ul class="flex space-x-10">
      <li>
        <a class="font-extralight" href="{base}/guides">Guides</a>
      </li>
      <li>
        <a class="font-extralight" href="#">Github</a>
      </li>
  
      <li>
        <a class="font-extralight" href="#">Twitter</a>
      </li>
    </ul>
  </nav>
</section>
