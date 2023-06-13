export const delay = (
	timeout: number,
	delayFunction: Function,
	argument?: object | 'undefined'
) => {
	let timer = setTimeout(() => {
		clearTimeout(timer);
		typeof argument !== 'undefined' ? delayFunction(argument) : delayFunction();
	}, timeout);
};
