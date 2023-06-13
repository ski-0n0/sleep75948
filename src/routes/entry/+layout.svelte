<script lang="ts">
	import './layout.css';
	import Menu from '../../components/Menu.svelte';
</script>

<div class="wrapper">
	<header class="header">
		<input type="checkbox" id="hamburger" class="hamburger" />
		<label class="potato" for="hamburger" />
		<nav class="nav">
			<p class="knight"><a href="/">&#9822;</a></p>
			<Menu />
		</nav>
	</header>
	<div class="main">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		grid-column-gap: 2vw;
		padding-block: 8vw;
		padding-inline: 8vw;
	}
	.header {
		flex-basis: 180px;
	}
	.hamburger {
		display: none;
	}
	.knight {
		font-size: 4rem;
	}
	@media screen and (max-width: 820px) {
		.header {
			flex-basis: 0;
		}
		.hamburger + .potato {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			position: fixed;
			left: 4vw;
			bottom: 2vh;
			z-index: var(--zIndex-openMenuTrigger);
			width: 4.4rem;
			height: 4.4rem;
			line-height: 1;
			cursor: pointer;
			background: var(--color-sarface-default);
			border-radius: 100%;
		}
		.hamburger + .potato:before {
			margin-block-start: -0.4rem;
			font-size: 4rem;
			content: var(--symbol);
		}
		.hamburger:checked + .potato {
		}
		.hamburger:checked + .potato:before {
			font-size: 2.4rem;
			content: '\2715';
		}
		.nav {
			width: 100%;
			height: 100%;
			padding-block: 4vh;
			padding-inline: 12vw;
			position: fixed;
			top: 0;
			left: -100%;
			z-index: var(--zIndex-menu);
			overflow: hidden;
			background: var(--color-sarface-default);
			transition: left 0.3s ease;
		}
		.hamburger:checked ~ .nav {
			left: 0;
		}
	}
</style>
