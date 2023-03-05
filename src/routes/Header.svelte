<script>
  import { base } from "$app/paths";
</script>

<section class="border-b border-black fixed top-0 h-16 w-screen z-10 bg-white">
  <nav class="container flex items-center justify-between h-full m-auto">
    <a href="/" class="flex items-center space-x-2">
      <span class="text-xl font-bold"
        >Svelte <span class="text-prime">Legos</span></span
      >
    </a>
    <div>
      <input class="border-black" type="text" />
    </div>
    <ul class="flex space-x-10">
      <li>
        <a class="font-extralight" href="{base}/guides">Guides</a>
      </li>
      <li>
        <a
          class="font-extralight"
          href="https://github.com/ankurrsinghal/svelte-legos"
          target="_blank"
          rel="noreferrer">Github</a
        >
      </li>

      <li>
        <a
          class="font-extralight"
          href="https://twitter.com/ankurpsinghal"
          target="_blank"
          rel="noreferrer">Twitter</a
        >
      </li>
    </ul>
  </nav>
</section>
