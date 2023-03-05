import Prism from 'prismjs';
import 'prism-svelte';
import fs from 'fs';
export const prerender = true;

function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export async function load({ route }: any) {
  const hookName = last(route.id.split('/'));
  let code = undefined;
  let meta = {};
  try {
    meta = JSON.parse(fs.readFileSync(`./src/lib/hooks/${hookName}/meta.json`).toString());
    code = fs.readFileSync(`./src/lib/hooks/${hookName}/usage.txt`).toString();
  } catch(e) {}
  return {
    hookName,
    meta,
    code: code && Prism.highlight(code, Prism.languages.svelte, 'svelte')
  }
}