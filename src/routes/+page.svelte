<script>
  import Nebula from '$lib/components/Nebula.svelte';
</script>

<Nebula />

<main class="container mx-auto px-4 py-16 relative z-10 min-h-screen flex flex-col items-center justify-center text-center">
  <div class="glass-panel p-12 max-w-2xl w-full border-cerulean/40 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
    <img src="/images/logo.webp" alt="Falstar Publishing" class="w-48 mx-auto mb-12 opacity-80" />
    
    <div class="mb-8">
      <div class="text-xs font-bold text-cerulean tracking-[0.4em] uppercase mb-4 animate-pulse">
        System Status: Initializing Uplink
      </div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Databank Locked</h1>
      <div class="h-px w-32 bg-cerulean mx-auto mb-8 opacity-50"></div>
    </div>

    <p class="text-lg text-text/80 mb-12 italic leading-relaxed">
      "The Falstar Store terminals are currently undergoing maintenance and security recalibration. Secure download protocols will be restored shortly."
    </p>

    <div class="flex flex-col gap-4 text-xs font-bold tracking-widest text-white/30 uppercase">
      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <span>Authorization Level</span>
        <span class="text-cerulean">PENDING</span>
      </div>
      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <span>Uplink Estimated</span>
        <span class="text-crimson">2026.Q2.TBD</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Terminal ID</span>
        <span>STORE-FALSTAR-001</span>
      </div>
    </div>

    <div class="mt-12">
      <a href="https://mikewyantjr.com" class="inline-block border border-cerulean/30 text-cerulean px-8 py-3 rounded-sm hover:bg-cerulean/10 hover:border-cerulean transition-all uppercase tracking-[0.2em] font-bold text-sm">
        Return to Station
      </a>
    </div>
  </div>

  <footer class="mt-16 text-xs text-white/20 uppercase tracking-widest">
    &copy; {new Date().getFullYear()} Falstar Publishing LLC // Secure Neural Uplink Environment
  </footer>
</main>

<style>
  .glass-panel {
    background: rgba(13, 22, 43, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 229, 255, 0.2);
    border-radius: 4px;
  }
</style>
