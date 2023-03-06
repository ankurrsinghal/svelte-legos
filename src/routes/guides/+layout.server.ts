import fs from 'fs';

const baseDir = './src';
const hooksDir = baseDir + '/lib/hooks';

export async function load() {
	const hooks = fs.readdirSync(hooksDir);
	return {
		hooks,
	};
}
