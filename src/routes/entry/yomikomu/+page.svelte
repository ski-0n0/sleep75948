<script lang="ts">
	import Browsing from './Browsing.svelte';
</script>

<svelte:head>
	<title>よみこむ</title>
	<meta name="description" content="" />
	<meta property="og:title" content="よみこむ &#9822;" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://sleep75948.vercel.app/entry/yomikomu" />
	<meta property="og:image" content="" />
	<meta property="og:site_name" content="よみこむ &#9822;" />
	<meta property="og:description" content="" />
	<meta property="og:locale" content="ja_JP" />
	<link rel="canonical" href="https://sleep75948.vercel.app/entry/yomikomu" />
</svelte:head>

<main>
	<h1>よみこむ</h1>
	<ul class="notes">
		<li class="note">JavaScript</li>
		<li class="note">4枚づつ30枚まで画像を読み込む</li>
	</ul>
	<Browsing src="/img/entry/yomikomu/" max="30" paging="4" />
</main>
