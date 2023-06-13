export let scrollTop: number = 0;

let scrollTopTimeout: number;

const setScrollTop = function () {
	clearTimeout(scrollTopTimeout);
	scrollTopTimeout = setTimeout(function () {
		scrollTop = Math.max.apply(null, [
			document.documentElement.scrollTop || document.body.scrollTop
		]);
		console.log('スクロールトップ：' + scrollTop);
	}, 100);
};

const watcher = function () {
	setScrollTop();
};

export const scrollTopWatcher = () => {
	window.addEventListener('scroll', watcher);
	watcher();
};

export const destroyScrollTopWatcher = () => {
	window.removeEventListener('scroll', watcher);
};
