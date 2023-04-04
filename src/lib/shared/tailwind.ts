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
    cursor-pointer
    disabled:bg-slate-300
    disabled:pointer-events-none
  `;

export const PrimaryButtonClassName = buildClassName(PrimaryButtonClassNames);

export const InputClass = `px-3 py-2 border border-black rounded-md text-md`;
