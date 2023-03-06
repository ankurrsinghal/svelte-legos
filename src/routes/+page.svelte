<script>
import { base } from '$app/paths';
import Feature from './Feature.svelte';
import { SiteDescription, SiteName, SiteTitle } from './constants';
</script>

<svelte:head>
	<title>{SiteName} • {SiteTitle}</title>

	<meta name="twitter:title" content={SiteName} />
	<meta name="twitter:description" content={SiteTitle} />
	<meta name="description" content={SiteDescription} />
</svelte:head>

<section class="py:20 lg:py-36 container mx-auto p-8">
  <div>
    <div class="max-w-xl space-y-4">
      <h1 class="text-4xl lg:text-7xl tracking-wider font-bold uppercase text-second">Svelte <b class="text-prime">Legos</b></h1>
      <h3 class="text-xl lg:text-3xl font-light text-text">{SiteTitle}</h3>
    </div>
    <div class="mt-6 lg:mt-12">
      <a href="{base}/guides" class="inline-block rounded-lg py-2 px-4 text-sm lg:text-base lg:py-3 lg:px-6 bg-prime text-white hover:underline">
        Get Started
      </a>
    </div>
  </div>
  <section class="grid gap-10 mt-10 lg:mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <Feature
      icon="🎛"
      title="Feature Rich"
      description="200+ functions for you to choose from"
    />
    <Feature
      icon="🦾"
      title="Type Strong"
      description="Written in TypeScript, with full TS docs"
    />
    <Feature
      icon="🔋"
      title="SSR Friendly"
      description="Works perfectly with server-side rendering/generation"
    />
    <Feature
      icon="⚡"
      title="Fully tree shakeable"
      description="Only take what you want"
    />
    <Feature
      icon="☁️"
      title="No bundler required"
      description="Usable via CDN, without any bundlers"
    />
    <Feature
      icon="🎪"
      title="Interactive demos"
      description="Documentation of functions also come with interactive demos!"
    />
  </section>
</section>