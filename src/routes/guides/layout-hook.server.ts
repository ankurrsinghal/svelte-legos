import Prism from "prismjs";
import "../../prism-svelte";
import fs from "fs";
export const prerender = true;

const REPO_BASE_URL = "https://github.com/ankurrsinghal/svelte-legos/tree/master/src";
const REPO_HOOKS_URL = (itemType: string) => REPO_BASE_URL + "/lib/" + itemType;

function last<T>(arr: T[]) {
	return arr[arr.length - 1];
}

function typeOfObject(path: string) {
	return path.split("/")[2];
}

export async function load({ route }: any) {
	const itemType = typeOfObject(route.id);
	const hookName = last(route.id.split("/"));
	let code = undefined;
	let meta = {};
	try {
		meta = JSON.parse(
			fs.readFileSync(`./src/lib/${itemType.toLowerCase()}/${hookName}/meta.json`).toString()
		);
		code = fs.readFileSync(`./src/lib/${itemType.toLowerCase()}/${hookName}/usage.txt`).toString();
	} catch (e) {}
	return {
		hookName,
		meta,
		code: code && Prism.highlight(code, Prism.languages.svelte, "svelte").trim(),
		sourceCodeURL: REPO_HOOKS_URL(itemType.toLowerCase()) + `/${hookName}/index.ts`,
		demoCodeURL: REPO_HOOKS_URL(itemType.toLowerCase()) + `/${hookName}/demo.svelte`,
	};
}
