<script lang="ts">
	import { browser } from '$app/environment';
	import { delay } from '$lib/delay';
	import {
		addMaximizeObject,
		destroyDisplayWatcher,
		displayHeight,
		displayWatcher,
		displayWidth
	} from '$lib/display';
	import { onDestroy, onMount } from 'svelte';

	type Bubble = {
		update: Function;
		stroke: Function;
		clear: Function;
	};

	let canvas: HTMLCanvasElement,
		c2d: CanvasRenderingContext2D,
		request: number,
		bubbles: Bubble[] = [],
		prevCoord: { x: number; y: number };

	if (browser) {
		onMount(() => {
			c2d = canvas.getContext('2d');
			displayWatcher();
			addMaximizeObject(canvas);
			watch();
		});

		onDestroy(() => {
			destroyDisplayWatcher();
			cancelAnimationFrame(request);
		});
	}

	const createBubble = function (_opt?: { x: number; y: number }) {
		const opt = _opt || { x: 0, y: 0 },
			angle = Math.random() < 0.5 ? 1 : -1,
			radius = Math.floor(Math.random() * 5);
		let obj: Bubble = { update: Function, stroke: Function, clear: Function },
			x = opt.x || Math.floor(Math.random() * displayWidth),
			y = opt.y || displayHeight,
			progress = Math.random(),
			quiver = Math.random(),
			span = Math.random() * 360;

		progress = progress < 0.3 ? 0.3 : progress;

		obj.update = function () {
			if (0 < y) {
				if (quiver < 0.5) {
					quiver = quiver + 2 * quiver * quiver;
				} else {
					quiver = quiver - 2 * (1 - quiver) * (1 - quiver);
				}
				progress = progress + quiver / 20;
				y = y - progress;
				span = span + Math.random() * 0.06;
				x = x + Math.sin(span + (Math.random() < 0.5 ? quiver : -quiver)) * angle;
				return true;
			} else {
				return false;
			}
		};

		obj.stroke = function () {
			c2d.beginPath();
			c2d.lineWidth = 1;
			c2d.strokeStyle = 'rgba(0,0,0,0.3)';
			c2d.arc(Math.ceil(x), Math.ceil(y), radius, 0, Math.PI * 2, false);
			c2d.stroke();
		};

		obj.clear = function () {
			c2d.clearRect(x - 10, y - 10, 20, 20);
		};

		return obj;
	};

	const updateBubble = function () {
		let temp = [];

		if (Math.random() < 0.01) {
			bubbles.push(createBubble());
		}
		for (let i = 0; i < bubbles.length; i++) {
			if (bubbles[i].update()) {
				bubbles[i].stroke();
				temp.push(bubbles[i]);
			}
		}
		bubbles = temp;
	};

	const clearBubble = function () {
		for (let i = 0; i < bubbles.length; i++) {
			bubbles[i].clear();
		}
	};

	const watch = function () {
		//c2d.clearRect(0, 0, display.width, display.height);
		clearBubble();
		updateBubble();
		request = requestAnimationFrame(watch);
	};

	const click = function (_e) {
		let e = _e.touches ? _e.touches[0] : _e,
			n = Math.floor(Math.random() * (300 < bubbles.length ? 2 : 10) + 5),
			later;

		later = function () {
			bubbles.push(
				createBubble({
					x: e.pageX + Math.random() * 40 - 20,
					y: e.pageY + Math.random() * 100 - 40
				})
			);
		};

		for (let i = 0; i < n; i++) {
			delay(Math.random() * 300, later);
		}
	};

	const drag = function (_e) {
		console.log(_e);
		let e = _e.touches ? _e.touches[0] : _e,
			n = Math.floor(Math.random() * (300 < bubbles.length ? 1 : 2)),
			touchCoord = { x: e.pageX - 0, y: e.pageY - 0 };

		if (prevCoord.x !== touchCoord.x || prevCoord.y !== touchCoord.y) {
			if (Math.random() < 1.0) {
				for (let i = 0; i < n; i++) {
					bubbles.push(
						createBubble({
							x: touchCoord.x + Math.random() * 40 - 20,
							y: touchCoord.y + Math.random() * 40 - 20
						})
					);
				}
			}
			prevCoord = touchCoord;
		}
	};
</script>

<svelte:head>
	<title>ぶくぶく &#9822;</title>
	<meta name="description" content="" />
	<meta property="og:title" content="ぶくぶく &#9822;" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://sleep75948.vercel.app/entry/bukubuku" />
	<meta property="og:image" content="" />
	<meta property="og:site_name" content="ぶくぶく &#9822;" />
	<meta property="og:description" content="" />
	<meta property="og:locale" content="ja_JP" />
	<link rel="canonical" href="https://sleep75948.vercel.app/entry/bukubuku" />
</svelte:head>

<main>
	<div class="inner">
		<h1>ぶくぶく</h1>
		<p class="voice">クリックしてね</p>
		<ul class="notes">
			<li class="note">JavaScript</li>
			<li class="note">Canvas 2D Context</li>
			<li class="note">三角関数</li>
			<li class="note">微分</li>
			<li class="note">間欠カオス・一次元カオス</li>
			<li class="note">反比例の式：y = a / x</li>
			<li class="note">さんすうはわからない</li>
		</ul>
	</div>
	<canvas bind:this={canvas} on:click={click} on:drag|capture={drag} />
</main>

<style>
	.inner {
		position: relative;
		z-index: 2;
	}
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
</style>
