interface SlideParams {}

export function rotate(node: HTMLElement, params: SlideParams = {}) {
	console.log(params);

	return {
		delay: params.delay || 0,
		duration: params.duration || 400,
		css: (t, u) => `transform: rotate(${t * 360}deg) scale(${t})`,
	};
}
