<script lang="ts">	
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<svelte:head>
	<style>
		:root {
			--code-bg: var(--back-light);
			--code-base: hsl(45, 7%, 35%);
			--code-comment: hsl(0, 0%, 41%);
			--code-keyword: hsl(204, 88%, 35%);
			--code-function: hsl(19, 67%, 44%);
			--code-string: hsl(41, 37%, 38%);
			--code-number: hsl(120, 100%, 25%);
			--code-template-string: hsl(2, 80%, 47%);
			--code-tags: var(--code-function);
			--code-important: var(--code-string);
		}

		pre {
			tab-size: 2;
			-moz-tab-size: 2;
		}

		.code-block pre {
			background-color: var(--code-bg);
			color: var(--code-base);
			border-radius: 0.5rem;
			padding: 1rem;
			margin: 0 0 1rem;
			font-size: 14px;
		}

		.code-block pre code,
		.token {
			color: var(--code-base);
		}

		.token.tag,
		.token.attr-value .attr-equals {
			color: var(--code-function);
		}

		.token.string,
		.token.interpolation-punctuation,
		.token.attr-value,
		.token.inserted {
			color: var(--code-string);
		}

		.token.builtin,
		.token.function {
			color: var(--code-function);
		}

		.token.keyword,
		.token.boolean {
			color: var(--code-keyword);
		}

		.token.comment {
			color: var(--code-comment);
		}

		.token.deleted {
			color: #fc9b9b;
		}

		.token.template-string .interpolation-punctuation,
		.token.template-string .string {
			color: var(--code-template-string);
		}
	</style>
</svelte:head>

<div>
	<section class="fixed top-0 w-80 h-screen pt-16 pl-20 flex flex-col border-r border-black bg-slate-100">
		<ul class="space-y-3 mt-8">
			{#each data.hooks as hook}
				<li>
					<a href={'/guides/hooks/' + hook} class="hover:underline">{hook}</a>
				</li>
			{/each}
		</ul>
	</section>
	<section class="pl-80" id="main-container">
		<slot />
	</section>
</div>
