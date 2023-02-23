import fs from 'fs';
import Prism from 'prismjs';
import 'prism-svelte';

const base = './src/routes/guides';

export async function load() {
	const functions = fs
		.readdirSync(base)
		.filter((f) => fs.lstatSync(base + '/' + f).isDirectory())
		.map((f) => f);
	return {
		functions,
		code: Prism.highlight(fs.readFileSync('./src/routes/guides/code.md').toString('ascii'), Prism.languages.svelte)
	};
}
