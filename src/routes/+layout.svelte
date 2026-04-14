<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import GlitchOverlay from '$lib/components/GlitchOverlay.svelte';

  /** @type {Record<string, string>} */
  const routeLabels = {
    '/': 'Archive Index',
    '/book/[id]': 'Dossier Access',
    '/success': 'Transmission Receipt'
  };

  /** @param {string | null | undefined} routeId */
  const getRouteLabel = (routeId) => routeLabels[routeId ?? ''] ?? 'Falstar Databank';

  /** @param {string | null | undefined} routeId */
  const getRouteCode = (routeId) =>
    (routeId ?? 'archive')
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 8)
      .toUpperCase() || 'ARCHIVE';

  onMount(() => {
    /** @type {any} */
    const runtimeWindow = window;

    // Lemon Squeezy Setup
    runtimeWindow.createLemonSqueezy = function () {
      runtimeWindow.LemonSqueezySetup = runtimeWindow.LemonSqueezySetup || function () {
        (runtimeWindow.LemonSqueezySetup.q = runtimeWindow.LemonSqueezySetup.q || []).push(arguments);
      };
    };

    // Initialize Lemon Squeezy if script is already loaded
    if (runtimeWindow.createLemonSqueezy) {
      runtimeWindow.createLemonSqueezy();
    }
  });

  $: currentYear = new Date().getFullYear();
  $: routeLabel = getRouteLabel($page.route.id);
  $: routeCode = getRouteCode($page.route.id);
</script>

<svelte:head>
  <script src="https://app.lemonsqueezy.com/js/lemon.js" defer on:load={() => (/** @type {any} */ (window)).createLemonSqueezy?.()}></script>
</svelte:head>

<GlitchOverlay />

<div class="hud-shell" aria-hidden="true">
  <div class="hud-noise"></div>
  <div class="hud-scanlines"></div>

  <div class="hud-rail hud-rail--top">
    <div class="hud-rail__group">
      <span class="hud-rail__label">Neural Bridge v5.1.4</span>
      <span class="hud-rail__status hud-rail__status--optional">Channel // <strong>{routeLabel}</strong></span>
    </div>
    <div class="hud-rail__group">
      <span class="hud-rail__status">Integrity // <strong>Stable</strong></span>
      <span class="hud-rail__status hud-rail__status--optional">Route // <strong>{routeCode}</strong></span>
    </div>
  </div>

  <div class="hud-frame-corner hud-frame-corner--tl"></div>
  <div class="hud-frame-corner hud-frame-corner--tr"></div>
  <div class="hud-frame-corner hud-frame-corner--bl"></div>
  <div class="hud-frame-corner hud-frame-corner--br"></div>
  <div class="hud-reticle"></div>

  <div class="hud-rail hud-rail--bottom">
    <div class="hud-rail__group">
      <span class="hud-rail__label">Falstar Publishing</span>
      <span class="hud-rail__status hud-rail__status--optional">Telemetry // <strong>Live Archive</strong></span>
    </div>
    <div class="hud-rail__group">
      <span class="hud-rail__status">Latency // <strong>24ms</strong></span>
      <span class="hud-rail__status hud-rail__status--optional">Viewport // <strong>Adaptive Clamp v5.1.4</strong></span>
    </div>
  </div>
</div>

<div class="app-shell flex flex-col min-h-screen">
  <div class="app-shell__content flex-1">
    <slot />
  </div>

  <footer class="relative z-20 border-t border-white/5 bg-black/40 py-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <img src="/images/logo.webp" alt="Falstar Logo" class="w-16 mb-8 grayscale opacity-50" />
          <p class="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-4">Falstar Publishing LLC</p>
          <p class="text-xs text-text/40 leading-relaxed font-medium italic">
            "Weaving the threads of dead stars into the stories of tomorrow."
          </p>
        </div>

        <!-- Links -->
        <div class="flex flex-col gap-4">
          <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-cerulean mb-4">Network Nodes</h3>
          <a href="https://mikewyantjr.com" class="text-xs font-bold uppercase tracking-widest text-text/60 hover:text-cerulean transition-colors">Author Website</a>
          <a href="https://medium.com/@mwyant" class="text-xs font-bold uppercase tracking-widest text-text/60 hover:text-cerulean transition-colors">Neural Log (Blog)</a>
          <a href="/#the-anisian-convergence" class="text-xs font-bold uppercase tracking-widest text-text/60 hover:text-cerulean transition-colors">The Convergence</a>
        </div>

        <!-- Delivery -->
        <div class="flex flex-col gap-4">
          <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-4">Uplink Protocols</h3>
          <p class="text-xs text-text/50 leading-relaxed">
            All digital assets are delivered via <span class="text-white font-bold">BookFunnel</span>. After acquisition, check your neural inbox for access codes.
          </p>
          <a href="https://bookfunnel.com/help" class="text-[10px] font-black uppercase tracking-[0.3em] text-cerulean/60 hover:text-cerulean transition-colors mt-2">Support Terminal -></a>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-1">
          <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-cerulean mb-6">Neural Uplink // Signup</h3>
          <div class="flex flex-col gap-4">
            <p class="text-xs text-text/50 leading-relaxed mb-2 uppercase tracking-widest font-bold">
              Join the collective for transmission alerts and mission logs.
            </p>
            <a 
              href="https://falstarpublishing.us14.list-manage.com/subscribe?u=a5a8a22d482c0a16695a7c7e4&id=628b37cf06" 
              target="_blank" 
              rel="noopener"
              class="bg-cerulean text-black font-black py-4 px-6 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all text-center no-underline"
            >
              Establish Connection
            </a>
          </div>
        </div>
      </div>

      <div class="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p class="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20">
          &copy; {currentYear} // Falstar Publishing // Neural Bridge Shell v5.1.4
        </p>
        <div class="flex gap-8">
          <span class="text-[9px] uppercase tracking-[0.4em] font-bold text-cerulean/30">Latency: 24ms</span>
          <span class="text-[9px] uppercase tracking-[0.4em] font-bold text-cerulean/30">System: Stable // v5.1.4 shell</span>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(.container) {
    max-width: 1400px;
  }
</style>
