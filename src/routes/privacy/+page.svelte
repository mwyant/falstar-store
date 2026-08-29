<script>
  import Nebula from '$lib/components/Nebula.svelte';
</script>

<svelte:head>
  <title>Privacy Policy // FALSTAR DATABANK</title>
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-4 mb-12">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Legal Protocol // Privacy</span>
    </div>

    <div class="hud-panel p-8 md:p-12 prose prose-invert max-w-none space-y-8 text-text/80 font-medium italic">
      <header>
        <p class="eyebrow text-cerulean/40 mb-4">Uplink Protocol // Privacy</p>
        <h1 class="type-display font-black text-white uppercase italic glow-text mb-6">Privacy Policy</h1>
        <p class="text-xs text-white/40 uppercase tracking-[0.3em] font-bold">Effective Date: August 28, 2026</p>
      </header>
      <section>
        <h2>Information Used for Delivery</h2>
        <p>When you buy an ebook through an external payment page, Falstar Publishing uses the payment and purchaser email information available through that provider to verify the sale and send your ebook.</p>
      </section>
      <section>
        <h2>How We Use Information</h2>
        <p>We use purchase information only to verify payment, deliver the purchased ebook, respond to support requests, and maintain required business records. We do not sell personal information.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>For privacy questions, email <a href="mailto:mike@falstarpublishing.com">mike@falstarpublishing.com</a>.</p>
      </section>
    </div>
  </div>
</main>
