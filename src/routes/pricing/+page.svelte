<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import books from '$lib/data/books.json';

  const series = [...new Set(books.map(b => b.series))];
</script>

<svelte:head>
  <title>Pricing Information // FALSTAR DATABANK</title>
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-4 mb-12">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">← Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Exchange Protocol // Pricing</span>
    </div>

    <div class="hud-panel p-8 md:p-12">
      <header class="mb-12">
        <p class="eyebrow text-cerulean/40 mb-4">Uplink Protocol // Pricing Breakdown</p>
        <h1 class="type-display font-black text-white uppercase italic glow-text mb-6">Pricing Breakdown</h1>
        <p class="text-xs text-white/40 uppercase tracking-[0.3em] font-bold">Effective Date: April 15, 2026</p>
      </header>

      <div class="prose prose-invert max-w-none space-y-12 text-text/80 font-medium italic">
        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-6 transform -skew-x-12">1. General Exchange Rate</h2>
          <p>
            Event ebook prices are listed below in U.S. dollars. Available titles are one-time purchases; no subscription or recurring charge is created.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-6 transform -skew-x-12">2. Event Catalog</h2>
          <p>
            Only titles marked available are offered during the event. A free title is shown as FREE; all other prices are displayed per title.
          </p>

          <div class="mt-8 space-y-6">
            {#each series as s}
              <div class="hud-panel p-4 border-white/5 bg-white/[0.02]">
                <h3 class="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">{s}</h3>
                <div class="space-y-2">
                  {#each books.filter(b => b.series === s && b.available) as b}
                    <div class="flex justify-between items-center text-xs uppercase tracking-widest">
                      <span class="text-white/60">{b.title}</span>
                      <span class={b.price === '0.00' ? 'text-cerulean font-black' : 'text-white/40'}>
                        {b.price === '0.00' ? 'FREE' : `$${b.price}`}
                      </span>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-6 transform -skew-x-12">3. No Recurring Charges</h2>
          <p>
            All acquisitions are one-time neural transmissions. We do not maintain any recurring billing cycles or subscription-based access models at this time.
          </p>
        </section>

        <section>
          <h2 class="text-cerulean font-black uppercase tracking-widest text-sm mb-6 transform -skew-x-12">4. Verification and Delivery</h2>
          <p>
            Falstar Publishing manually verifies each payment and sends the ebook to the purchaser email confirmed during checkout. For assistance, email <a href="mailto:mike@falstarpublishing.com">mike@falstarpublishing.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</main>
