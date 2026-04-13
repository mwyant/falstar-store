<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import books from '$lib/data/books.json';

  const convergenceBooks = books.filter(b => b.series === 'The Anisian Convergence');
</script>

<Nebula />

<main class="container mx-auto px-4 py-16 relative z-10">
  <header class="text-center mb-16">
    <img src="/images/logo.webp" alt="Falstar Publishing" class="mx-auto w-48 mb-8" />
    <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Falstar Store</h1>
    <p class="text-xl text-cerulean opacity-80 uppercase tracking-widest font-light">Digital Uplink Terminals</p>
  </header>

  <section id="convergence" class="mb-20">
    <div class="flex items-center gap-4 mb-12">
      <h2 class="text-2xl font-bold">The Anisian Convergence</h2>
      <div class="h-px flex-1 bg-gradient-to-r from-cerulean to-transparent opacity-30"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each convergenceBooks as book}
        <div class="glass-panel group overflow-hidden flex flex-col h-full">
          <div class="aspect-[2/3] overflow-hidden relative">
            <img 
              src={book.cover} 
              alt={book.title} 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-60"></div>
            {#if book.prequel}
              <div class="absolute top-4 right-4 bg-crimson text-white px-3 py-1 text-xs font-bold tracking-tighter">PREQUEL</div>
            {:else if book.standalone}
              <div class="absolute top-4 right-4 bg-cerulean text-black px-3 py-1 text-xs font-bold tracking-tighter uppercase">Standalone</div>
            {:else}
              <div class="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-bold">BOOK {book.bookNum}</div>
            {/if}
          </div>

          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-xl font-bold mb-2 group-hover:text-cerulean transition-colors">{book.title}</h3>
            <p class="text-sm text-text opacity-70 mb-6 flex-1 line-clamp-3 leading-relaxed">
              {book.description}
            </p>
            
            <div class="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <span class="text-2xl font-bold tracking-tighter">${book.price}</span>
              <button class="bg-cerulean text-black font-bold py-2 px-6 rounded-sm uppercase text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                Acquire
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <footer class="text-center opacity-30 text-sm mt-32">
    <p>&copy; {new Date().getFullYear()} Falstar Publishing LLC. Neural interface connected.</p>
  </footer>
</main>

<style>
  :global(.mx-auto) { margin-left: auto; margin-right: auto; }
  :global(.container) { max-width: 1200px; }
  :global(.grid) { display: grid; }
  :global(.grid-cols-1) { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 768px) { :global(.md\:grid-cols-2) { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { :global(.lg\:grid-cols-3) { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  :global(.gap-8) { gap: 2rem; }
  :global(.flex) { display: flex; }
  :global(.flex-col) { flex-direction: column; }
  :global(.items-center) { align-items: center; }
  :global(.justify-between) { justify-content: space-between; }
  :global(.text-center) { text-align: center; }
  :global(.font-bold) { font-weight: 700; }
  :global(.mb-4) { margin-bottom: 1rem; }
  :global(.mb-8) { margin-bottom: 2rem; }
  :global(.mb-12) { margin-bottom: 3rem; }
  :global(.mb-16) { margin-bottom: 4rem; }
  :global(.mb-20) { margin-bottom: 5rem; }
  :global(.p-6) { padding: 1.5rem; }
  :global(.py-16) { padding-top: 4rem; padding-bottom: 4rem; }
  :global(.px-4) { padding-left: 1rem; padding-right: 1rem; }
  :global(.relative) { position: relative; }
  :global(.z-10) { z-index: 10; }
  :global(.text-cerulean) { color: var(--clr-cerulean); }
  :global(.text-crimson) { color: var(--clr-crimson); }
  :global(.bg-cerulean) { background-color: var(--clr-cerulean); }
  :global(.bg-crimson) { background-color: var(--clr-crimson); }
  :global(.line-clamp-3) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
