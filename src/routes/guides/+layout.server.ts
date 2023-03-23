import fs from "fs";

const baseDir = "./src";
const storesDir = baseDir + "/lib/stores";
const actionsDir = baseDir + "/lib/actions";
const utilitiesDir = baseDir + "/lib/utilities";

export async function load() {
	const stores = fs.readdirSync(storesDir);
	const actions = fs.readdirSync(actionsDir);
	const utilities = fs.readdirSync(utilitiesDir);
	return {
		stores,
		actions,
		utilities,
	};
}
