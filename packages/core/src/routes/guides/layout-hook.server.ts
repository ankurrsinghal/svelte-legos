import Prism from 'prismjs';
import 'prism-svelte';
import fs from 'fs';
export const prerender = true;

function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export async function load({ route }: any) {
  const hookName = last(route.id.split('/'));
  const code = fs.readFileSync(`./src/lib/hooks/${hookName}/demo.svelte`).toString();
  return {
    code: Prism.highlight(code, Prism.languages.svelte, 'svelte')
  }
}