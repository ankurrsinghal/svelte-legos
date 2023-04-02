import { totalUtilsLength } from "./directories";

export async function load() {
	return {
		utilsLength: totalUtilsLength,
	};
}
