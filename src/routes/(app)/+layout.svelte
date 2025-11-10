<script lang="ts">
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app">
	<Header />

	<main class="main-content">
		<slot />
	</main>

	<Footer />
</div>

<style lang="scss">
	@use '$ui/styles/variables.scss' as *;

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
	}
</style>
