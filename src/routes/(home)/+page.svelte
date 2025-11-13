<script lang="ts">
  import { onMount } from 'svelte';
  import { setLocale } from '$lib/i18n';
  import HomePage from '../[lang=locale]/(home)/+page.svelte';

  // Set Chinese as default locale for root path
  onMount(() => {
    setLocale('zh');
  });
</script>

<HomePage />
