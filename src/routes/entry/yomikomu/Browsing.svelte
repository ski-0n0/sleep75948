<script lang="ts">
	import {
		destroyDisplayWatcher,
		displayHeight,
		displayWatcher,
		getDocumentHeight
	} from '$lib/display';
	import { destroyScrollTopWatcher, scrollTop, scrollTopWatcher } from '$lib/scrollTop';
	import { onDestroy, onMount } from 'svelte';

	export let src: string;
	export let max: number;
	export let paging: number;

	let target, frame, loading, trigger;

	max = max - 1;
	paging = paging - 1;
	let request;

	onMount(() => {
		scrollTopWatcher();
		displayWatcher();
	});

	onDestroy(() => {
		destroyScrollTopWatcher();
		destroyDisplayWatcher();
		cancelAnimationFrame(request);
	});

	function loader() {
		let point = 0,
			i = 0;

		const watch = function () {
			console.log('watch');
			if (getDocumentHeight() - 100 < scrollTop + displayHeight) {
				page();
			} else {
				//console.log('getDocumentHeight:'+display.getDocumentHeight()+' scroll.scrollTop+display.height:'+(scroll.scrollTop+display.height))
				request = requestAnimationFrame(watch);
			}
		};

		const page = function () {
			if (max < point) {
				hideLoading();
				return;
			}
			console.log(point + 1 + '枚目を表示するよ');

			const img = new Image();

			const add = () => {
				frame.appendChild(img);
				img.setAttribute('class', 'pages animated fadeIn');
			};

			point++;

			img.setAttribute('src', src + 'browsing_' + (point < 10 ? '0' + point : point) + '.png');
			img.setAttribute('class', 'pages');

			if (i < paging) {
				i++;
				img.addEventListener('load', function () {
					add();
					page();
				});
			} else {
				i = 0;
				img.addEventListener('load', function () {
					add();
					request = requestAnimationFrame(watch);
				});
			}
		};

		page();
	}

	const showLoading = () => {
		loading.style.display = 'block';
	};
	const hideLoading = () => {
		loading.style.display = 'none';
	};

	function handleOnClick() {
		trigger.style.display = 'none';
		showLoading();
		loader();
	}
</script>

<div bind:this={target} class="target">
	<div bind:this={frame} class="frame" />
	<div bind:this={loading} class="loading">
		<img src="/img/entry/yomikomu/loader.gif" />
	</div>
	<button bind:this={trigger} class="trigger" on:click={handleOnClick}>よみこむ？</button>
</div>

<style>
	.target {
		position: relative;
	}
	.trigger {
		margin-top: 1em;
		padding: 0.8em 2em 1em;
		background: #eee;
		border-top: 1px solid #fff;
		border-left: 1px solid #fff;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-shadow: -1px -1px 1px rgba(000, 000, 000, 0.2), 1px 1px 1px rgba(255, 255, 255, 1);
		cursor: pointer;
	}
	.loading {
		width: 100%;
		padding: 4% 0 2%;
		display: none;
	}
	.loading img {
		width: auto;
		margin: 0 auto;
	}
	.pages {
		width: auto;
		margin: 20px auto 0;
		opacity: 0;
		border: 1px solid #ccc;
	}

	@media screen and (max-width: 1000px) {
		.pages {
			width: 100%;
		}
	}
</style>
