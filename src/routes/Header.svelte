<script>
import { base } from "$app/paths";
import GithubIcon from "./GithubIcon.svelte";
import TwitterIcon from "./TwitterIcon.svelte";
</script>

<section class="border-b border-black fixed top-0 h-16 w-screen z-10 bg-white px-8">
	<nav class="container flex items-center justify-between h-full m-auto">
		<a href="/" class="flex items-center space-x-2">
			<span class="text-xl font-bold">Svelte <span class="text-prime">Legos</span></span>
		</a>
		<!-- <div>
      <input class="border-black" type="text" />
    </div> -->
		<ul class="flex space-x-8 lg:space-x-10">
			<li>
				<a class="font-extralight" href="{base}/guides">Guides</a>
			</li>
			<li>
				<a
					class="font-extralight w-6 h-6 block"
					href="https://github.com/ankurrsinghal/svelte-legos"
					target="_blank"
					rel="noreferrer"><GithubIcon className="fill-[currentColor]" /></a
				>
			</li>

			<li>
				<a
					class="font-extralight w-6 h-6 block"
					href="https://twitter.com/ankurpsinghal"
					target="_blank"
					rel="noreferrer"><TwitterIcon className="fill-[currentColor]" /></a
				>
			</li>
		</ul>
	</nav>
</section>
