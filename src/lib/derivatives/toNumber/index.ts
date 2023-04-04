import { derived, type Readable } from "svelte/store";

export interface UseToNumberOptions {
	/**
	 * Method to use to convert the value to a number.
	 *
	 * @default 'parseFloat'
	 */
	method?: "parseFloat" | "parseInt";

	/**
	 * The base in mathematical numeral systems passed to `parseInt`.
	 * Only works with `method: 'parseInt'`
	 */
	radix?: number;

	/**
	 * Replace NaN with zero
	 *
	 * @default false
	 */
	nanToZero?: boolean;
}

export function toNumber(
	store: Readable<string | number | undefined | null>,
	options: UseToNumberOptions = {}
) {
	const { method = "parseFloat", radix, nanToZero } = options;
	return derived(store, ($store) => {
		let resolved = $store;
		if (typeof $store === "string") resolved = Number[method](resolved, radix);
		if (nanToZero && isNaN(resolved)) resolved = 0;
		return resolved;
	});
}
