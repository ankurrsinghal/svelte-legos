export const buildClassName = (className: string) => {
	return className
		.split("\n")
		.map((c) => c.trim())
		.filter(Boolean)
		.join(" ");
};

export const PrimaryButtonClassNames = `
    inline-block
    text-sm
    bg-prime
    text-white
    px-4
    py-2
    rounded-md
    disabled:bg-slate-300
    cursor-pointer
  `;

export const PrimaryButtonClassName = buildClassName(PrimaryButtonClassNames);
