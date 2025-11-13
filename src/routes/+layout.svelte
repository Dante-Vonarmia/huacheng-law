<script lang="ts">
import '$ui/styles/global.scss';
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { initializeLocale } from '$lib/i18n';

onMount(() => {
  initializeLocale($page.url.pathname);
});
</script>

<slot />

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
