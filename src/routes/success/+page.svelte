<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import { onMount } from 'svelte';

  let countdown = 10;
  
  onMount(() => {
    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <title>Acquisition Successful // FALSTAR DATABANK</title>
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 py-32 relative z-10 min-h-screen flex items-center justify-center">
  <div class="max-w-3xl w-full text-center">
    <div class="glass-panel p-12 border-cerulean/30 relative overflow-hidden">
      <!-- Success Icon -->
      <div class="w-24 h-24 border-4 border-cerulean rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(0,229,255,0.4)]">
        <span class="text-4xl text-cerulean">✓</span>
      </div>

      <h1 class="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
        Acquisition Complete
      </h1>

      <div class="h-1 w-24 bg-cerulean mx-auto mb-12"></div>

      <div class="space-y-8 text-left max-w-xl mx-auto">
        <p class="text-xl md:text-2xl text-text/90 leading-relaxed font-medium italic text-center">
          "Neural link verified. Digital assets have been dispatched to your primary uplink address."
        </p>

        <div class="bg-white/5 border border-white/10 p-8 space-y-4">
          <h2 class="text-[10px] font-black uppercase tracking-[0.5em] text-cerulean mb-4">Delivery Protocol: BookFunnel</h2>
          <p class="text-sm text-text/70 leading-relaxed">
            1. Check your email for a transmission from <span class="text-white font-bold">BookFunnel</span>.<br>
            2. Follow the secure link to access your library.<br>
            3. Use the BookFunnel app or your preferred reading device to initialize the data stream.
          </p>
        </div>

        <p class="text-[10px] uppercase tracking-[0.3em] text-white/30 text-center font-bold">
          If transmission fails, contact the support terminal at help@bookfunnel.com
        </p>
      </div>

      <div class="mt-16">
        <a href="/" class="inline-block bg-white/10 hover:bg-white/20 text-white font-black py-4 px-12 rounded-sm uppercase text-xs tracking-[0.4em] border border-white/20 transition-all">
          Return to Catalog
        </a>
      </div>

      <!-- Animated terminal artifacts -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cerulean/50 to-transparent animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cerulean/50 to-transparent animate-pulse"></div>
    </div>
  </div>
</main>
