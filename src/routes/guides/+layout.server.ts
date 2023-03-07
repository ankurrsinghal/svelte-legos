import fs from 'fs';

const baseDir = './src';
const hooksDir = baseDir + '/lib/hooks';
const actionsDir = baseDir + '/lib/actions';

export async function load() {
	const hooks = fs.readdirSync(hooksDir);
	const actions = fs.readdirSync(actionsDir);
	return {
		hooks,
		actions,
	};
}
