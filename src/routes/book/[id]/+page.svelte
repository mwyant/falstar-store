<script>
  import Nebula from '$lib/components/Nebula.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  const { book } = data;

  const archiveCode = `${book.id.toUpperCase()}-${String(book.bookNum ?? 0).padStart(2, '0')}-${book.genre
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 3)
    .toUpperCase()}`;

  const classification = {
    'Dystopian Sci-Fi': 'AETHER CLEARANCE',
    'Comedic Urban Fantasy': 'CIVIL DISTORTION',
    'Dark Fantasy': 'BLACK VEIL'
  }[book.genre] ?? 'OPEN ARCHIVE';

  const sequenceLabel = book.prequel
    ? 'Prequel Transmission'
    : book.standalone
      ? 'Standalone Dossier'
      : `Sequence ${String(book.bookNum).padStart(2, '0')}`;

  const dossierLog = [
    { label: 'Archive Code', value: archiveCode },
    { label: 'Classification', value: classification },
    { label: 'Stream Type', value: 'Direct Neural Delivery' },
    { label: 'Asset State', value: book.price === '0.00' ? 'Open Access' : 'Premium Secure' }
  ];
</script>

<svelte:head>
  <title>{book.title} // FALSTAR DATABANK</title>
  <meta name="description" content={book.description} />
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <div class="max-w-6xl mx-auto w-full">
    <div class="flex items-center gap-4 px-4" style="margin-bottom: clamp(2rem, 4vw, 4rem);">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">← Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Accessing Dossier // {book.id.toUpperCase()}</span>
    </div>

    <div class="dossier-layout px-4">
      <div class="dossier-cover-stack w-full max-w-sm mx-auto lg:max-w-none">
        <div class="hud-panel p-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative group overflow-hidden">
          <div class="aspect-[2/3] overflow-hidden relative bg-black/40">
            <img 
              src={book.cover} 
              alt={book.title} 
              class="w-full h-full object-cover shadow-2xl transition-all duration-1000 group-hover:scale-110"
              on:error={(event) => (/** @type {HTMLImageElement} */ (event.currentTarget)).src = 'https://via.placeholder.com/600x900/030008/00e5ff?text=DATA+ENCRYPTED'}
            />
            
            {#if book.prequel}
              <div class="absolute top-4 right-4 bg-crimson text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase transform -skew-x-12">PREQUEL</div>
            {:else if book.standalone}
              <div class="absolute top-4 right-4 bg-cerulean text-black px-3 py-1 text-[10px] font-black tracking-widest uppercase transform -skew-x-12">Standalone</div>
            {:else}
              <div class="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1 text-[10px] font-black tracking-widest uppercase transform -skew-x-12">Uplink {book.bookNum}</div>
            {/if}
          </div>
          
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-cerulean shadow-[0_0_20px_rgba(0,229,255,0.8)] animate-pulse"></div>
        </div>

        <div class="hud-panel dossier-cover-meta">
          <div class="dossier-cover-meta__row eyebrow">
            <span>Visual Asset</span>
            <strong>{sequenceLabel}</strong>
          </div>
          <div class="dossier-cover-meta__row eyebrow">
            <span>Series</span>
            <strong>{book.series}</strong>
          </div>
          <div class="dossier-cover-meta__row eyebrow">
            <span>Genre Signal</span>
            <strong>{book.genre}</strong>
          </div>
        </div>
      </div>

      <div class="dossier-body-stack flex flex-col h-full pt-4">
        <header class="dossier-header hud-panel mb-12 relative">
          <div class="dossier-header__top eyebrow">
            <span>Archive // {archiveCode}</span>
            <div class="dossier-header__line"></div>
            <span>Classification // {classification}</span>
          </div>

          <div class="dossier-header__series">
            <span class="dossier-pill">{book.series}</span>
            <span class="dossier-pill dossier-pill--ghost">{book.genre}</span>
            <span class="dossier-pill dossier-pill--ghost">{sequenceLabel}</span>
          </div>

          <h1 class="dossier-title font-black text-white uppercase italic glow-text">
            {book.title}
          </h1>

          <div class="dossier-metrics eyebrow">
            <div class="dossier-metric">
              <span>Status</span>
              <strong>Verified / Neural Ready</strong>
            </div>
            <div class="dossier-metric">
              <span>Signal Path</span>
              <strong>{book.genre}</strong>
            </div>
            <div class="dossier-metric">
              <span>Terminal</span>
              <strong>Falstar Secure Databank</strong>
            </div>
          </div>
        </header>

        <div class="hud-panel dossier-synopsis flex-1 border-white/5 relative overflow-hidden">
          <h2 class="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <span class="w-8 h-px bg-white/10"></span>
            Intelligence Dossier // Synopsis
          </h2>
          <p class="type-body-lg content-measure text-text/90 font-medium italic mb-12 text-left relative z-10">
            "{book.description}"
          </p>
          
          <div class="dossier-synopsis__grid">
            <div class="space-y-2">
              <span class="block text-white/20 uppercase tracking-[0.4em] text-[9px] font-black">Link Status</span>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span class="text-cerulean font-black uppercase tracking-widest text-xs transform -skew-x-12">Verified // Encrypted</span>
              </div>
            </div>
            <div class="space-y-2">
              <span class="block text-white/20 uppercase tracking-[0.4em] text-[9px] font-black">Uplink Protocol</span>
              <span class="text-white font-black uppercase tracking-widest text-xs italic transform -skew-x-12">Direct Neural Stream</span>
            </div>
          </div>

          <div class="hud-panel dossier-log">
            <h3 class="eyebrow text-cerulean/55">Transmission Log</h3>
            <div class="dossier-log__grid">
              {#each dossierLog as entry}
                <div class="dossier-log__row eyebrow">
                  <span>{entry.label}</span>
                  <strong>{entry.value}</strong>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="hud-panel dossier-cta-panel">
          <div class="dossier-price-card">
            <span class="eyebrow text-white/35">Exchange Rate</span>
            <strong>${book.price}</strong>
            <span class="eyebrow text-cerulean/55">{book.price === '0.00' ? 'Immediate Release' : 'Premium File Access'}</span>
          </div>

          <div class="dossier-acquire">
            <button 
              class="flex-1 bg-cerulean text-black font-black py-6 px-10 rounded-sm uppercase text-xl tracking-[0.4em] hover:bg-white hover:shadow-[0_0_60px_rgba(0,229,255,0.6)] transition-all transform active:scale-[0.98] italic"
              on:click={() => (/** @type {any} */ (window)).LemonSqueezy?.Url.Open(book.lemonSqueezyId)}
            >
              <span class="inline-block transform -skew-x-12">Initiate Acquisition</span>
            </button>
            <p class="eyebrow text-white/35">Secure handoff via monitored delivery channel. Cover-first presentation preserved through final checkout.</p>
          </div>
        </div>
        
        <div class="mt-12 text-[9px] text-white/20 uppercase tracking-[0.5em] font-black flex items-center gap-4">
          <div class="h-px flex-1 bg-white/5"></div>
          <span>Secure Neural Bridge Established</span>
          <div class="h-px flex-1 bg-white/5"></div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .container { width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .justify-center { justify-content: center; }
  .gap-3 { gap: 0.75rem; }
  .gap-4 { gap: 1rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
  .mb-12 { margin-bottom: 3rem; }
  .text-xs { font-size: 0.75rem; }
  .text-xl { font-size: 1.25rem; }
  .font-medium { font-weight: 500; }
  .font-black { font-weight: 900; }
  .italic { font-style: italic; }
  .uppercase { text-transform: uppercase; }
  .tracking-widest { letter-spacing: 0.1em; }
</style>
