import fs from "fs";

const baseDir = "./src";
const storesDir = baseDir + "/lib/stores";
const actionsDir = baseDir + "/lib/actions";
const utilitiesDir = baseDir + "/lib/utilities";
const transitionsDir = baseDir + "/lib/transitions";
const middlewaresDir = baseDir + "/lib/middlewares";
const derivativesDir = baseDir + "/lib/derivatives";

const isDir = (path: string) => !path.includes(".");

export const stores = fs.readdirSync(storesDir).filter(isDir);
export const actions = fs.readdirSync(actionsDir).filter(isDir);
export const utilities = fs.readdirSync(utilitiesDir).filter(isDir);
export const transitions = fs.readdirSync(transitionsDir).filter(isDir);
export const middlewares = fs.readdirSync(middlewaresDir).filter(isDir);
export const derivatives = fs.readdirSync(derivativesDir).filter(isDir);

export const totalUtilsLength =
	stores.length +
	actions.length +
	utilities.length +
	transitions.length +
	middlewares.length +
	derivatives.length;
