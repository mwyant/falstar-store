<script>
  import { onMount } from 'svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  let glitching = false;
  let glitchType = 'default';
  let timeout;

  const genreColors = {
    'Dystopian Sci-Fi': '#00e5ff',
    'Comedic Urban Fantasy': '#ff003c',
    'Dark Fantasy': '#ffffff',
    'default': '#00e5ff'
  };

  afterNavigate(() => {
    glitching = true;
    
    // Determine genre color if on a book page
    const book = $page.data.book;
    if (book && book.genre) {
      document.documentElement.style.setProperty('--clr-cerulean', genreColors[book.genre] || genreColors.default);
    } else {
      document.documentElement.style.setProperty('--clr-cerulean', genreColors.default);
    }

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      glitching = false;
    }, 400);
  });

  beforeNavigate(() => {
    glitching = true;
  });
</script>

{#if glitching}
  <div class="glitch-overlay">
    <div class="scanline"></div>
    <div class="noise"></div>
    <div class="slice-wrap">
      {#each Array(5) as _}
        <div class="slice"></div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .glitch-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    pointer-events: none;
    background: rgba(0, 229, 255, 0.05);
    overflow: hidden;
  }

  .scanline {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.5) 50%
    );
    background-size: 100% 4px;
    animation: scanline 0.1s infinite;
  }

  .noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3");
    opacity: 0.15;
    mix-blend-mode: overlay;
  }

  .slice-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slice {
    position: absolute;
    width: 100%;
    height: 20%;
    background: inherit;
    animation: slice 0.2s infinite;
  }

  .slice:nth-child(1) { top: 0%; animation-delay: 0.05s; }
  .slice:nth-child(2) { top: 20%; animation-delay: 0.15s; }
  .slice:nth-child(3) { top: 40%; animation-delay: 0.1s; }
  .slice:nth-child(4) { top: 60%; animation-delay: 0.2s; }
  .slice:nth-child(5) { top: 80%; animation-delay: 0.05s; }

  @keyframes scanline {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  @keyframes slice {
    0% { transform: translateX(0); opacity: 0; }
    20% { transform: translateX(-10px); opacity: 0.5; background: rgba(0, 229, 255, 0.2); }
    40% { transform: translateX(10px); opacity: 0.5; background: rgba(255, 0, 60, 0.2); }
    60% { transform: translateX(-5px); opacity: 0.5; background: rgba(255, 255, 255, 0.2); }
    100% { transform: translateX(0); opacity: 0; }
  }
</style>
