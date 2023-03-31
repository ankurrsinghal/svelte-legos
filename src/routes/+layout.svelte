<script>
import "../app.css";
import Header from "./Header.svelte";
import { SiteDescription, SiteName, SiteTitle } from "./constants";
</script>

<svelte:head>
	<title>{SiteName} • {SiteTitle}</title>
	<meta charset="UTF-8" />
	<meta name="twitter:title" content={SiteName} />
	<meta name="twitter:description" content={SiteTitle} />
	<meta name="description" content={SiteDescription} />

	<link href="https://sveltelegos.com/" rel="canonical" />

	<meta property="og:title" content={SiteName} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sveltelegos.com" />

	<meta
		name="keywords"
		content="sveltejs utilities, sveltejs actions, svelte actions, svelte kit actions, sveltejs stores, sveltejs use, svelte use, svelte, sveltejs, sveltekit, svelte-kit"
	/>
</svelte:head>

<div class="bg-gray-50">
	<Header />
	<main class="pt-16 w-full min-h-[100vh]">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>
</div>
