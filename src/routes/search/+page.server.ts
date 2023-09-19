import { all } from "../directories";

export const load = ({ url }) => {
	const bricks = Object.entries(all)
		.map(([category, bricks]) => {
			return bricks.map((brick) => {
				return {
					url: `/guides/${category}/${brick}`,
					text: brick,
				};
			});
		})
		.flat();

	return { bricks, query: url.searchParams.get("query")?.trim() || "" };
};
