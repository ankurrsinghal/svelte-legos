<script>
import "../app.css";
import Header from "./Header.svelte";
import { SiteDescription, SiteName, SiteTitle } from "./constants";
</script>

<svelte:head>
	<title>{SiteName} • {SiteTitle}</title>

	<meta name="twitter:title" content={SiteName} />
	<meta name="twitter:description" content={SiteTitle} />
	<meta name="description" content={SiteDescription} />
</svelte:head>

<div class="bg-gray-50">
	<Header />
	<main class="pt-16 w-screen min-h-[100vh]">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>
</div>
