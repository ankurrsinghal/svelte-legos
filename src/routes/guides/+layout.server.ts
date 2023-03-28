import fs from "fs";

const baseDir = "./src";
const storesDir = baseDir + "/lib/stores";
const actionsDir = baseDir + "/lib/actions";
const utilitiesDir = baseDir + "/lib/utilities";
const transitionsDir = baseDir + "/lib/transitions";

export async function load() {
	const stores = fs.readdirSync(storesDir);
	const actions = fs.readdirSync(actionsDir);
	const utilities = fs.readdirSync(utilitiesDir);
	const transitions = fs.readdirSync(transitionsDir);
	return {
		stores,
		actions,
		utilities,
		transitions,
	};
}
