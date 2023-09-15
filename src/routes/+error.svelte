<script lang="ts">
import { page } from "$app/stores";

$: errorCode = $page.status;
$: errorMessage = $page.error?.message || "Something went wrong";
</script>

<section class="py:20 lg:py-36 container mx-auto p-8">
	<div>
		<div class="max-w-xl space-y-4">
			<h1 class="text-4xl lg:text-7xl tracking-wider font-bold uppercase text-second">
				Svelte <b class="text-prime">Legos</b>
			</h1>
			<h3 class="text-xl lg:text-3xl font-light text-text">{errorCode} - {errorMessage}</h3>
		</div>
		<div class="mt-6 lg:mt-12">
			<a
				href="/"
				class="inline-block rounded-lg py-2 px-4 text-sm lg:text-base lg:py-3 lg:px-6 bg-prime text-white hover:underline"
			>
				Go Home
			</a>
		</div>
	</div>
</section>
