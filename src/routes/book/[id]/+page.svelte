<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import { base } from '$app/paths';

  /** @type {import('./$types').PageData} */
  export let data;
  const { book } = data;
</script>

<svelte:head>
  <title>{book.title} // FALSTAR DATABANK</title>
  <meta name="description" content={book.description} />
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 py-16 relative z-10 min-h-screen flex flex-col justify-center">
  <div class="max-w-6xl mx-auto w-full">
    <a href="/" class="inline-flex items-center gap-3 text-cerulean mb-16 hover:translate-x-[-8px] transition-all font-black uppercase tracking-[0.3em] text-xs group text-decoration-none">
      <span class="border border-cerulean/30 px-2 py-1 group-hover:bg-cerulean group-hover:text-black transition-colors">←</span> 
      <span>Return to Catalog</span>
    </a>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-left">
      <!-- Book Cover (Column 1-5) -->
      <div class="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
        <div class="glass-panel p-2 md:p-3 border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <div class="aspect-[2/3] overflow-hidden relative bg-black/40">
            <img 
              src={book.cover} 
              alt={book.title} 
              class="w-full h-full object-cover shadow-2xl transition-transform duration-1000 hover:scale-105"
              on:error={(e) => e.target.src = 'https://via.placeholder.com/600x900/030008/00e5ff?text=DATA+ENCRYPTED'}
            />
            {#if book.prequel}
              <div class="absolute top-4 right-4 md:top-6 md:right-6 bg-crimson text-white px-3 md:px-5 py-1 md:py-2 text-[10px] md:text-xs font-black tracking-widest uppercase shadow-xl">PREQUEL</div>
            {:else if book.standalone}
              <div class="absolute top-4 right-4 md:top-6 md:right-6 bg-cerulean text-black px-3 md:px-5 py-1 md:py-2 text-[10px] md:text-xs font-black tracking-widest uppercase shadow-xl">Standalone</div>
            {:else}
              <div class="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-3 md:px-5 py-1 md:py-2 text-[10px] md:text-xs font-black tracking-widest shadow-xl uppercase">Uplink {book.bookNum}</div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Book Info (Column 6-12) -->
      <div class="lg:col-span-7 flex flex-col h-full">
        <header class="mb-8 md:mb-12">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-cerulean font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] bg-cerulean/10 px-3 py-1 border border-cerulean/20">{book.series}</span>
            <div class="h-px flex-1 bg-gradient-to-r from-cerulean/40 to-transparent"></div>
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-white mb-6 uppercase text-left">
            {book.title}
          </h1>
          <div class="h-1.5 w-24 md:w-32 bg-cerulean shadow-[0_0_20px_rgba(0,229,255,0.6)]"></div>
        </header>

        <div class="glass-panel p-6 md:p-10 mb-8 md:mb-12 flex-1 border-white/5 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-cerulean/30"></div>
          <h2 class="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 md:mb-6">Neural Link // Synopsis</h2>
          <p class="text-lg md:text-xl lg:text-2xl leading-relaxed text-text/90 font-medium italic mb-8 md:mb-10 text-left">
            "{book.description}"
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-6 md:py-8 border-t border-white/5">
            <div>
              <span class="block text-white/20 uppercase tracking-[0.3em] text-[8px] md:text-[9px] mb-2 font-bold">Integrity Status</span>
              <span class="text-cerulean font-black uppercase tracking-widest text-xs md:text-sm">Verified // Authorized</span>
            </div>
            <div>
              <span class="block text-white/20 uppercase tracking-[0.3em] text-[8px] md:text-[9px] mb-2 font-bold">Delivery Protocol</span>
              <span class="text-white font-black uppercase tracking-widest text-xs md:text-sm">Direct Neural Uplink</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-8">
          <div class="flex flex-col bg-white/5 px-6 md:px-8 py-3 md:py-4 border border-white/10">
            <span class="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.4em] mb-1 font-bold">Exchange Rate</span>
            <span class="text-3xl md:text-4xl font-black tracking-tighter text-white">${book.price}</span>
          </div>
          <button 
            class="flex-1 bg-cerulean text-black font-black py-4 md:py-6 px-8 md:px-10 rounded-sm uppercase text-lg md:text-xl tracking-[0.3em] hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all transform active:scale-[0.98] shadow-[0_0_30px_rgba(0,229,255,0.4)]"
            on:click={() => window.LemonSqueezy?.Url.Open(book.lemonSqueezyId)}
          >
            Initiate Acquisition
          </button>
        </div>
        
        <div class="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold text-center sm:text-left">
          Secure connection established via Falstar Neural Bridge
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .container { width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 1024px) {
    .lg\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
    .lg\:col-span-5 { grid-column: span 5 / span 5; }
    .lg\:col-span-7 { grid-column: span 7 / span 7; }
  }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  @media (min-width: 640px) {
    .sm\:flex-row { flex-direction: row; }
    .sm\:items-center { align-items: center; }
    .sm\:text-left { text-align: left; }
  }
  .items-start { align-items: flex-start; }
  .justify-center { justify-content: center; }
  .gap-3 { gap: 0.75rem; }
  .gap-4 { gap: 1rem; }
  .gap-8 { gap: 2rem; }
  .gap-16 { gap: 4rem; }
  .p-3 { padding: 0.75rem; }
  .p-10 { padding: 2.5rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-12 { margin-bottom: 3rem; }
  .mb-16 { margin-bottom: 4rem; }
  .mt-8 { margin-top: 2rem; }
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
  .md\:text-7xl { font-size: 4.5rem; }
  .font-medium { font-weight: 500; }
  .font-black { font-weight: 900; }
  .italic { font-style: italic; }
  .uppercase { text-transform: uppercase; }
  .tracking-widest { letter-spacing: 0.1em; }
  .tracking-tighter { letter-spacing: -0.05em; }
  .text-decoration-none { text-decoration: none; }
</style>
