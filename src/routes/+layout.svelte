<script>
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(() => {
    // Lemon Squeezy Setup
    window.createLemonSqueezy = function() {
      window.LemonSqueezySetup = window.LemonSqueezySetup || function() {
        (window.LemonSqueezySetup.q = window.LemonSqueezySetup.q || []).push(arguments);
      };
    };
  });
</script>

<svelte:head>
  <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
</svelte:head>

<slot />
