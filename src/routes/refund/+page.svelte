<script>
  import Nebula from '$lib/components/Nebula.svelte';
</script>

<svelte:head>
  <title>Refund Policy // FALSTAR DATABANK</title>
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-4 mb-12">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">← Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Legal Protocol // Refunds</span>
    </div>

    <div class="hud-panel p-8 md:p-12">
      <header class="mb-12">
        <p class="eyebrow text-cerulean/40 mb-4">Uplink Protocol // Compensation</p>
        <h1 class="type-display font-black text-white uppercase italic glow-text mb-6">Refund Policy</h1>
        <p class="text-xs text-white/40 uppercase tracking-[0.3em] font-bold">Effective Date: April 15, 2026</p>
      </header>

      <div class="prose prose-invert max-w-none space-y-8 text-text/80 font-medium italic">
        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">1. Digital Asset Finality</h2>
          <p>
            Due to the nature of digital downloads, purchases are generally final once the ebook has been delivered. Before delivery, Falstar Publishing reviews payment and delivery details manually.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">2. Technical Interface Failures</h2>
          <p>
            If you cannot access a delivered ebook or do not receive delivery after payment verification, contact us. We will verify the transaction and provide an alternative delivery path when appropriate.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">3. Erroneous Transmissions</h2>
          <p>
            In the rare event of an incorrect dossier being delivered (e.g., the wrong book file), we will correct the transmission immediately upon verification.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-4 transform -skew-x-12">4. Contact Support</h2>
          <p>
            For assistance with a purchase or delivery, email <a href="mailto:mike@falstarpublishing.com">mike@falstarpublishing.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</main>
