<script>
  import Nebula from '$lib/components/Nebula.svelte';
</script>

<svelte:head>
  <title>Terms of Service // FALSTAR DATABANK</title>
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-4 mb-12">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">← Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Legal Protocol // Terms</span>
    </div>

    <div class="hud-panel p-8 md:p-12">
      <header class="mb-12">
        <p class="eyebrow text-cerulean/40 mb-4">Uplink Protocol // Agreement</p>
        <h1 class="type-display font-black text-white uppercase italic glow-text mb-6">Terms of Service</h1>
        <p class="text-xs text-white/40 uppercase tracking-[0.3em] font-bold">Effective Date: April 15, 2026</p>
      </header>

      <div class="prose prose-invert max-w-none space-y-8 text-text/80 font-medium italic">
        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">1. Access and License</h2>
          <p>
            By accessing the Falstar Databank, you are granted a non-exclusive, non-transferable license to access and read the digital assets (e-books) provided through this terminal. All materials are licensed to Falstar Publishing LLC by the author, Mike Wyant Jr.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">2. Intellectual Property</h2>
          <p>
            All content within this databank, including but not limited to text, cover art, logos, and neural interface designs, is the property of Mike Wyant Jr. and Falstar Publishing LLC. Unauthorized duplication or redistribution of these assets is a violation of the neural bridge integrity and applicable copyright laws.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">3. Digital Delivery</h2>
          <p>
            For the event storefront, Falstar Publishing manually verifies each payment and delivers the purchased ebook to the purchaser email confirmed during checkout. You are responsible for providing and monitoring a valid email address. Delivery is not automated and may require reasonable processing time.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">4. User Conduct</h2>
          <p>
            Users agree not to attempt to breach the encryption of any digital dossier or interfere with the operation of the Falstar Databank interface.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of New York.
          </p>
        </section>
      </div>
    </div>
  </div>
</main>
