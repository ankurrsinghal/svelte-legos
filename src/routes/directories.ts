import fs from "fs";

const baseDir = "./src";
const storesDir = baseDir + "/lib/stores";
const actionsDir = baseDir + "/lib/actions";
const utilitiesDir = baseDir + "/lib/utilities";
const transitionsDir = baseDir + "/lib/transitions";
const middlewaresDir = baseDir + "/lib/middlewares";

export const stores = fs.readdirSync(storesDir);
export const actions = fs.readdirSync(actionsDir);
export const utilities = fs.readdirSync(utilitiesDir);
export const transitions = fs.readdirSync(transitionsDir);
export const middlewares = fs.readdirSync(middlewaresDir);

export const totalUtilsLength =
	stores.length + actions.length + utilities.length + transitions.length + middlewares.length;
