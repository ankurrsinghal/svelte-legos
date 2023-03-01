import Prism from 'prismjs';
import 'prism-svelte';
import fs from 'fs';
import type { PageServerLoad } from './$types';
export const prerender = true;


export async function load({ params }: PageServerLoad) {
  const code = fs.readFileSync(`./src/lib/hooks/${params.hook}/demo.svelte`).toString();
  console.log(code);
  return {
    code: Prism.highlight(code, Prism.languages.svelte)
  }
}