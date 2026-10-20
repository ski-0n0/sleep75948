<script lang="ts">
	import '@acab/reset.css';
	import './layout.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children?.()}
</div>
