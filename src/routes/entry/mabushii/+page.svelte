<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import {
		addMaximizeObject,
		destroyDisplayWatcher,
		displayWatcher,
		displayWidth
	} from '$lib/display';
	import { easing } from '$lib/easing';

	if (browser) {
		onMount(() => {
			displayWatcher();
			addMaximizeObject(space);
			_moveLights = [light01, light02, light03, light04];

			moveLights[0] = moveLight(_moveLights[0], 10, 3, 10, 320);
			moveLights[1] = moveLight(_moveLights[1], 30, 10, 20, 100);
			moveLights[2] = moveLight(_moveLights[2], 40, 16, 26, 100);
			moveLights[3] = moveLight(_moveLights[3], 80, 50, 40, 100);

			flashLights = [flash01, flash02, flash03, flash04];

			document.addEventListener('pointermove', pointerMove);
			document.addEventListener('touchmove', pointerMove);
			pointerMove({ pageX: 0 });

			for (let i = 0; i < _moveLights.length; i++) _moveLights[i].style.display = 'block';
		});
		onDestroy(() => {
			destroyDisplayWatcher();
			document.removeEventListener('pointermove', pointerMove);
			document.removeEventListener('touchmove', pointerMove);
		});
	}

	let space,
		light01,
		light02,
		light03,
		light04,
		flash01,
		flash02,
		flash03,
		flash04,
		flash01show = false,
		flash02show = false,
		flash03show = false,
		flash04show = false,
		moveLights = [],
		_moveLights = [],
		flashLights = [],
		oX = 63,
		oY = 50,
		prevPoint = 0;

	const moveLight = function (obj, width, radius, degreeDistance, degreeDefault) {
		return function (nowX) {
			let radian =
				(easing.easeInOutSine(0, nowX, 0, degreeDistance, 100) + degreeDefault) * (Math.PI / 180);

			obj.style.left = radius * Math.cos(radian) + oX - width / 2 / (displayWidth * 0.01) + '%';
			obj.style.top =
				radius * Math.sin(radian) * 0.7 + oY - width / 2 / (displayWidth * 0.01) + '%';
		};
	};

	const pointerMove = function (e) {
		let nowX = Math.floor(e.pageX / (displayWidth * 0.01));

		for (let i = 0; i < moveLights.length; i++) moveLights[i](nowX);

		if ((80 < prevPoint && nowX < 90) || (80 < nowX && prevPoint < 90)) {
			flash01show = true;
			flash02show = false;
			flash03show = false;
			flash04show = false;
		} else if ((45 < prevPoint && nowX < 55) || (45 < nowX && prevPoint < 55)) {
			flash01show = false;
			flash02show = true;
			flash03show = false;
			flash04show = false;
		} else if ((70 < prevPoint && nowX < 73) || (70 < nowX && prevPoint < 73)) {
			flash01show = false;
			flash02show = false;
			flash03show = true;
			flash04show = false;
		} else if ((90 < prevPoint && nowX < 93) || (90 < nowX && prevPoint < 93)) {
			flash01show = false;
			flash02show = false;
			flash03show = false;
			flash04show = true;
		} else {
			flash01show = false;
			flash02show = false;
			flash03show = false;
			flash04show = false;
		}

		prevPoint = nowX;
	};
</script>

<svelte:head>
	<title>まぶしい &#9822;</title>
	<meta name="description" content="" />
	<meta property="og:title" content="まぶしい &#9822;" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://sleep75948.vercel.app/entry/mabishii" />
	<meta property="og:image" content="" />
	<meta property="og:site_name" content="まぶしい &#9822;" />
	<meta property="og:description" content="" />
	<meta property="og:locale" content="ja_JP" />
	<link rel="canonical" href="https://sleep75948.vercel.app/entry/mabishii" />
</svelte:head>

<main>
	<div class="inner">
		<h1>まぶしい</h1>
		<ul class="notes">
			<li class="note">JavaScript</li>
			<li class="note">度数法とは、直角の1/90を1度とするもの。数学的根拠はない。</li>
			<li class="note">
				弧度法とは、半径1の円の弧の長さを1ラジアンとするもの。弧の長さの半径に対する比率。<br
				/>ラジアンの範囲は、0&#x2266;rad&#x2266;2&#x3C0;。
			</li>
			<li class="note">全ての円は互いに相似</li>
			<li class="note">easing関数の捌き方<br />null,現在のステップ数,初期値,目標値,総ステップ数</li>
		</ul>
	</div>
	<div id="space" class="space" bind:this={space}>
		<div class="center">・</div>
		<img
			src="/img/entry/mabushii/light_01.png"
			alt=""
			class="moveLight light01"
			bind:this={light01}
		/>
		<img
			src="/img/entry/mabushii/light_02.png"
			alt=""
			class="moveLight light02"
			bind:this={light02}
		/>
		<img
			src="/img/entry/mabushii/light_03.png"
			alt=""
			class="moveLight light03"
			bind:this={light03}
		/>
		<img
			src="/img/entry/mabushii/light_04.png"
			alt=""
			class="moveLight light04"
			bind:this={light04}
		/>
		<div class="staticWrap01">
			<div class="staticWrap02">
				<div class="static">
					<img
						src="/img/entry/mabushii/flash_01.png"
						alt=""
						class="flashLight flash01 {flash01show ? 'flash' : ''}"
						bind:this={flash01}
					/>
					<img
						src="/img/entry/mabushii/flash_02.png"
						alt=""
						class="flashLight flash02 {flash02show ? 'flash' : ''}"
						bind:this={flash02}
					/>
					<img
						src="/img/entry/mabushii/flash_03.png"
						alt=""
						class="flashLight flash03 {flash03show ? 'flash' : ''}"
						bind:this={flash03}
					/>
					<img
						src="/img/entry/mabushii/flash_04.png"
						alt=""
						class="flashLight flash04 {flash04show ? 'flash' : ''}"
						bind:this={flash04}
					/>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.space {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		overflow: hidden;
		background: url('/img/entry/mabushii/bg_01.png') 50% 28vh no-repeat,
			linear-gradient(rgba(60, 119, 185, 0.4), #fff 28%);
		background-size: cover;
	}
	.staticWrap01 {
		width: 80%;
		height: 100%;
		margin: auto;
		display: table;
	}
	.staticWrap02 {
		display: table-cell;
		vertical-align: middle;
	}
	.static {
		position: relative;
	}
	.center {
		position: absolute;
		left: 63%;
		top: 50%;
		display: none;
	}
	.moveLight,
	.flashLight {
		width: auto;
		position: absolute;
		z-index: 10;
	}
	.moveLight {
		display: none;
	}
	.flashLight {
		opacity: 0;
		transition: opacity 0.2s ease-in;
	}
	.flashLight.flash {
		opacity: 1;
	}
	.light01 {
		width: 10px;
	}
	.light02 {
		width: 30px;
	}
	.light03 {
		width: 40px;
	}
	.light04 {
		width: 80px;
	}
	.flash01 {
		width: 20%;
		left: 20%;
		top: 37%;
	}
	.flash02 {
		width: 24%;
		left: 58%;
		top: 3%;
	}
	.flash03 {
		width: 2%;
		left: 15%;
		top: 40%;
	}
	.flash04 {
		width: 4%;
		left: 43%;
		top: 68%;
	}
</style>
