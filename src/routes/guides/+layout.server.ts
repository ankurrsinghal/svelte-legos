import {
	totalUtilsLength,
	stores,
	actions,
	utilities,
	transitions,
	middlewares,
} from "../directories";

export async function load() {
	return {
		totalUtilsLength,
		stores,
		actions,
		utilities,
		transitions,
		middlewares,
	};
}
