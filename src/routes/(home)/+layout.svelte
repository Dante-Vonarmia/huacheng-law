<script lang="ts">
import '$ui/styles/global.scss';
import Footer from '$lib/components/Footer.svelte';
</script>

<div class="home-app">
	<slot />
	<Footer />
</div>

<style lang="scss">
	.home-app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	:global(body) {
		overflow-x: hidden;
	}
</style>
