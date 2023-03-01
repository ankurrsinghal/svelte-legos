import fs from 'fs';
import Prism from 'prismjs';
import 'prism-svelte';

const baseDir = './src';
const hooksDir = baseDir + '/lib/hooks';

export async function load() {
	const hooks = fs.readdirSync(hooksDir);
	return {
		hooks,
		// code: Prism.highlight(fs.readFileSync('./src/routes/guides/code.md').toString('ascii'), Prism.languages.svelte)
	};
}
