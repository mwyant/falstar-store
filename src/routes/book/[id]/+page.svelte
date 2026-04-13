<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import { base } from '$app/paths';

  /** @type {import('./$types').PageData} */
  export let data;
  const { book } = data;
</script>

<svelte:head>
  <title>{book.title} // Falstar Store</title>
  <meta name="description" content={book.description} />
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 py-16 relative z-10 min-h-screen flex flex-col justify-center">
  <div class="max-w-5xl mx-auto w-full">
    <a href="/" class="inline-flex items-center gap-2 text-cerulean mb-12 hover:translate-x-[-4px] transition-transform font-bold uppercase tracking-widest text-sm">
      ← Return to Catalog
    </a>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Book Cover -->
      <div class="glass-panel p-2">
        <div class="aspect-[2/3] overflow-hidden relative">
          <img 
            src={book.cover} 
            alt={book.title} 
            class="w-full h-full object-cover shadow-2xl"
          />
          {#if book.prequel}
            <div class="absolute top-4 right-4 bg-crimson text-white px-4 py-2 text-sm font-bold tracking-tighter shadow-lg">PREQUEL</div>
          {:else if book.standalone}
            <div class="absolute top-4 right-4 bg-cerulean text-black px-4 py-2 text-sm font-bold tracking-tighter uppercase shadow-lg">Standalone</div>
          {:else}
            <div class="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-bold shadow-lg">DATA // B00K {book.bookNum}</div>
          {/if}
        </div>
      </div>

      <!-- Book Info -->
      <div class="flex flex-col h-full">
        <header class="mb-8">
          <span class="text-cerulean font-bold tracking-[0.3em] uppercase text-xs mb-2 block">{book.series}</span>
          <h1 class="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-white mb-4">
            {book.title}
          </h1>
          <div class="h-1 w-24 bg-cerulean shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
        </header>

        <div class="glass-panel p-8 mb-8 flex-1">
          <h2 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Project Synopsis</h2>
          <p class="text-lg leading-relaxed text-text/90 italic border-l-2 border-cerulean/30 pl-6 mb-8">
            "{book.description}"
          </p>
          
          <div class="grid grid-cols-2 gap-4 text-sm mb-8">
            <div>
              <span class="block text-white/30 uppercase tracking-widest text-[10px] mb-1">Status</span>
              <span class="text-cerulean font-bold uppercase">Authorized</span>
            </div>
            <div>
              <span class="block text-white/30 uppercase tracking-widest text-[10px] mb-1">Uplink</span>
              <span class="text-white font-bold uppercase">Direct Neural Download</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-8">
          <div class="flex flex-col">
            <span class="text-[10px] text-white/30 uppercase tracking-widest mb-1">Exchange Rate</span>
            <span class="text-4xl font-bold tracking-tighter">${book.price}</span>
          </div>
          <button 
            class="flex-1 bg-cerulean text-black font-bold py-4 px-8 rounded-sm uppercase text-lg tracking-[0.2em] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            on:click={() => window.LemonSqueezy.Url.Open(book.lemonSqueezyId)}
          >
            Initiate Acquisition
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :global(.text-text) { color: var(--clr-text); }
  :global(.bg-bg) { background-color: var(--clr-bg); }
  
  /* Ensuring Tailwind classes are respected if not fully built yet */
  .container { width: 100%; max-width: 1280px; margin-left: auto; margin-right: auto; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .gap-4 { gap: 1rem; }
  .gap-8 { gap: 2rem; }
  .gap-12 { gap: 3rem; }
  .p-2 { padding: 0.5rem; }
  .p-8 { padding: 2rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-12 { margin-bottom: 3rem; }
  .mt-auto { margin-top: auto; }
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .md\:text-6xl { font-size: 3.75rem; line-height: 1; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .font-bold { font-weight: 700; }
  .italic { font-style: italic; }
  .uppercase { text-transform: uppercase; }
  .tracking-widest { letter-spacing: 0.1em; }
  .tracking-tighter { letter-spacing: -0.05em; }
</style>
