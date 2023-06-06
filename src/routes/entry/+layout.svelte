<script lang="ts">
import Menu from '../../components/Menu.svelte';
</script>

<div class="wrapper">
	<header class="header">
		<input type="checkbox" id="hamburger" />
		<label class="potato" for="hamburger" />
		<nav class="nav">
			<p class="knight"><a href="/">&#9822;</a></p>
			<Menu/>
		</nav>
	</header>
	<div class="main">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		grid-column-gap: 2%;
		padding-block: 8%;
		padding-inline: 8%;
	}
	.header {
		flex-basis: 180px;
	}
	#hamburger {
		display: none;
	}
	.knight {
		font-size: 4rem;
	}
	.main {
		flex-grow: 1;
	}
	@media screen and (max-width: 800px) {
		.header {
			flex-basis: 0;
		}
		#hamburger {
		}
		#hamburger + .potato {
			text-align: center;
			position: fixed;
			left: 4%;
			bottom: 0.4em;
			z-index: 10;
			cursor: pointer;
		}
		#hamburger + .potato:before {
			font-size: 220%;
			content: var(--symbol);
		}
		#hamburger:checked + .potato {
		}
		#hamburger:checked + .potato:before {
			font-size: 2.4rem;
			content: '\2715';
		}
		.nav {
			width: 100%;
			height: 100%;
			padding: 5%;
			position: fixed;
			top: 0;
			left: -100%;
			z-index: 9;
			overflow: hidden;
			background: #ddd;
			transition: left 0.3s ease;
		}
		#hamburger:checked ~ .nav {
			width: 100%;
			left: 0;
		}
		div.nav {
		}
		.withSandBox .wrapper article .sandBox {
			margin-bottom: 2em;
		}
	}

	@media screen and (max-width: 320px) {
		#hamburger + .potato {
			bottom: 0;
		}
	}
</style>
