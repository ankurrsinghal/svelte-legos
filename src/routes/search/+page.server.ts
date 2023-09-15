import { all } from "../directories";

export const load = ({ url }) => {
	const query = url.searchParams.get("q")?.trim() || "";

	const results = Object.entries(all).reduce((acc, [key, value]) => {
		const matches = query
			? value.filter((item) => formatForSearch(item).includes(formatForSearch(query)))
			: [];
		return { ...acc, [key]: matches };
	}, {});

	const totalResults = Object.values(results).reduce((acc, value) => acc + value.length, 0);

	return { q: query, results, totalResults };
};

const formatForSearch = (str: string) => str.replace(/\s/g, "").toLowerCase();
