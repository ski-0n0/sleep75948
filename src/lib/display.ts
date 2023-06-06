export let displayWidth: number = 0;
export let displayHeight: number = 0;
export const getDocumentWidth = () => {
	return Math.max.apply(null, [
		document.body.clientWidth,
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.documentElement.clientWidth
	]);
};
export const getDocumentHeight = () => {
	const h = Math.max.apply(null, [
		document.body.clientHeight,
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.documentElement.clientHeight
	]);
	// if( height < h ) body.classList.add('extended');
	return h;
};
export const addMaximizeObject = (obj: HTMLElement) => {
	maximizeObjects.push(obj);
	watcher();
};

const setDisplayWidth = () => {
	displayWidth = window.innerWidth - 0;
};

const setDisplayHeight = () => {
	displayHeight = window.innerHeight - 0;
};

let maximizeObjects: HTMLElement[] = [];
const fixMaximizeObjects = function () {
	maximizeObjects.map((maximizeObject) => {
		if (maximizeObject.nodeName === 'CANVAS') {
			maximizeObject.setAttribute('width', displayWidth + '');
			maximizeObject.setAttribute('height', displayHeight + '');
		} else {
			maximizeObject.style.width = displayWidth + 'px';
			maximizeObject.style.height = displayHeight + 'px';
		}
	});
};
const watcher = () => {
	setDisplayWidth();
	setDisplayHeight();
	fixMaximizeObjects();
};

export const displayWatcher = () => {
	window.addEventListener('resize', watcher);
	watcher();
};

export const destroyDisplayWatcher = () => {
	window.removeEventListener('resize', watcher);
}
