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
    <div class="flex items-center gap-4 mb-16 px-4">
      <a href="/" class="group flex items-center gap-3 text-cerulean/60 hover:text-cerulean transition-colors no-underline">
        <span class="text-[10px] font-black uppercase tracking-[0.4em]">← Return to Databank</span>
      </a>
      <div class="h-[1px] flex-1 bg-white/10"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Accessing Dossier // {book.id.toUpperCase()}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start text-left px-4">
      <!-- Book Cover (Column 1-5) -->
      <div class="lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-none">
        <div class="hud-panel p-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative group overflow-hidden">
          <div class="aspect-[2/3] overflow-hidden relative bg-black/40">
            <img 
              src={book.cover} 
              alt={book.title} 
              class="w-full h-full object-cover shadow-2xl transition-all duration-1000 group-hover:scale-110"
              on:error={(e) => e.target.src = 'https://via.placeholder.com/600x900/030008/00e5ff?text=DATA+ENCRYPTED'}
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
      </div>

      <!-- Book Info (Column 6-12) -->
      <div class="lg:col-span-7 flex flex-col h-full pt-4">
        <header class="mb-12 relative">
          <div class="flex items-center gap-4 mb-6">
            <span class="text-cerulean font-black tracking-[0.4em] uppercase text-[10px] bg-cerulean/5 px-4 py-2 border border-cerulean/20 italic transform -skew-x-12">{book.series}</span>
            <div class="h-px flex-1 bg-gradient-to-r from-cerulean/40 to-transparent"></div>
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-white mb-6 uppercase italic glow-text">
            <span class="inline-block transform -skew-x-12">{book.title}</span>
          </h1>
          <div class="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/30">
            <span class="transform -skew-x-12">Genre: {book.genre}</span>
            <div class="w-1.5 h-1.5 rounded-full bg-cerulean animate-ping"></div>
          </div>
        </header>

        <div class="hud-panel p-8 md:p-12 mb-12 flex-1 border-white/5 relative overflow-hidden">
          <h2 class="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <span class="w-8 h-px bg-white/10"></span>
            Intelligence Dossier // Synopsis
          </h2>
          <p class="text-lg md:text-xl lg:text-2xl leading-relaxed text-text/90 font-medium italic mb-12 text-left relative z-10">
            "{book.description}"
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-t border-white/10">
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
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
          <div class="flex flex-col bg-white/5 px-10 py-5 border border-white/10 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-cerulean/50"></div>
            <span class="text-[9px] text-white/30 uppercase tracking-[0.4em] mb-1 font-black">Exchange Rate</span>
            <span class="text-4xl font-black tracking-tighter text-white">${book.price}</span>
          </div>
          <button 
            class="flex-1 bg-cerulean text-black font-black py-6 px-10 rounded-sm uppercase text-xl tracking-[0.4em] hover:bg-white hover:shadow-[0_0_60px_rgba(0,229,255,0.6)] transition-all transform active:scale-[0.98] italic"
            on:click={() => window.LemonSqueezy?.Url.Open(book.lemonSqueezyId)}
          >
            <span class="inline-block transform -skew-x-12">Initiate Acquisition</span>
          </button>
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
