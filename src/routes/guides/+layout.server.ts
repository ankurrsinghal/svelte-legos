import fs from 'fs';

const baseDir = './src';
const storesDir = baseDir + '/lib/stores';
const actionsDir = baseDir + '/lib/actions';

export async function load() {
	const stores = fs.readdirSync(storesDir);
	const actions = fs.readdirSync(actionsDir);
	return {
		stores,
		actions,
	};
}
