<script>
	import { base } from '$app/paths';
import Feature from '$lib/Feature.svelte';
import { SiteDescription, SiteTitle } from './constants';
</script>

<svelte:head>
	<title>SvelteUse • {SiteTitle}</title>

	<meta name="twitter:title" content="SvelteUse" />
	<meta name="twitter:description" content={SiteTitle} />
	<meta name="description" content={SiteDescription} />
</svelte:head>

<section class="py-36">
  <div class="max-w-xl space-y-4">
    <h1 class="text-7xl tracking-wider font-bold uppercase text-second">Svelte<b class="text-prime">Use</b></h1>
    <h3 class="text-3xl font-light text-text">Collection of Essential Svelte Utilities</h3>
  </div>
  <div class="mt-12">
    <a href="{base}/guides" class="inline-block rounded-lg py-3 px-6 bg-prime text-white hover:underline">
      Get Started
    </a>
  </div>
  <section class="grid gap-20 mt-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <Feature
      title="Feature Rich"
      description="200+ functions for you to choose from"
      bgClass="bg-slate-700"
    />
    <Feature
      title="Type Strong"
      description="Written in TypeScript, with full TS docs"
      bgClass="bg-slate-700"
    />
    <Feature
      title="SSR Friendly"
      description="Works perfectly with server-side rendering/generation"
      bgClass="bg-slate-700"
    />
    <Feature
      title="Fully tree shakeable"
      description="Only take what you want"
      bgClass="bg-slate-700"
    />
    <Feature
      title="No bundler required"
      description="Usable via CDN, without any bundlers"
      bgClass="bg-slate-700"
    />
    <Feature
      title="Interactive demos"
      description="Documentation of functions also come with interactive demos!"
      bgClass="bg-slate-700"
    />
  </section>
</section>