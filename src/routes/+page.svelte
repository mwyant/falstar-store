<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import books from '$lib/data/books.json';

  const convergenceBooks = books.filter(b => b.series === 'The Anisian Convergence');
  const whitestoneBooks = books.filter(b => b.series === 'The Misadventures of Darren Whitestone');
  const wrongGodsBooks = books.filter(b => b.series === 'The Wrong Gods');

  const series = [
    { name: 'The Anisian Convergence', books: convergenceBooks, color: 'cerulean' },
    { name: 'The Misadventures of Darren Whitestone', books: whitestoneBooks, color: 'crimson' },
    { name: 'The Wrong Gods', books: wrongGodsBooks, color: 'white' }
  ];
</script>

<Nebula />

<main class="container mx-auto px-4 py-16 relative z-10">
  <header class="text-center mb-24">
    <img src="/images/logo.webp" alt="Falstar Publishing" class="mx-auto w-48 mb-8 opacity-90" />
    <h1 class="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">Falstar Store</h1>
    <p class="text-xl text-cerulean opacity-80 uppercase tracking-[0.3em] font-light">Digital Uplink Terminals</p>
  </header>

  {#each series as s}
    <section id={s.name.toLowerCase().replace(/ /g, '-')} class="mb-32">
      <div class="flex items-center gap-6 mb-12">
        <h2 class="text-3xl font-bold text-white whitespace-nowrap">{s.name}</h2>
        <div class="h-px flex-1 bg-gradient-to-r opacity-30" 
             style="background-image: linear-gradient(to right, var(--clr-{s.color}), transparent)">
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {#each s.books as book}
          <a href="/book/{book.id}" class="glass-panel group overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-cerulean/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] hover:-translate-y-1">
            <div class="aspect-[2/3] overflow-hidden relative bg-black/40">
              <img 
                src={book.cover} 
                alt={book.title} 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                on:error={(e) => e.target.src = 'https://via.placeholder.com/400x600/030008/00e5ff?text=DATA+ENCRYPTED'}
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#030008] via-transparent to-transparent opacity-80"></div>
              
              {#if book.prequel}
                <div class="absolute top-4 right-4 bg-crimson text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase">Prequel</div>
              {:else if book.standalone}
                <div class="absolute top-4 right-4 bg-cerulean text-black px-3 py-1 text-[10px] font-black tracking-widest uppercase">Standalone</div>
              {:else}
                <div class="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-black tracking-widest uppercase">Uplink {book.bookNum}</div>
              {/if}
            </div>

            <div class="p-8 flex flex-col flex-1 border-t border-white/5">
              <h3 class="text-2xl font-bold mb-3 group-hover:text-cerulean transition-colors leading-tight">{book.title}</h3>
              <p class="text-sm text-text opacity-60 mb-8 flex-1 line-clamp-3 leading-relaxed font-medium italic">
                "{book.description}"
              </p>
              
              <div class="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div class="flex flex-col">
                  <span class="text-[9px] uppercase tracking-[0.2em] opacity-40 mb-1">Exchange</span>
                  <span class="text-2xl font-black tracking-tighter">${book.price}</span>
                </div>
                <span class="bg-cerulean text-black font-black py-3 px-8 rounded-sm uppercase text-xs tracking-[0.2em] group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                  Acquire
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}

  <footer class="text-center opacity-20 text-[10px] mt-48 tracking-[0.5em] uppercase pb-16">
    <p>&copy; {new Date().getFullYear()} Falstar Publishing LLC // Neural interface stable // v0.2.0-dev</p>
  </footer>
</main>

<style>
  .container { width: 100%; max-width: 1200px; margin-left: auto; margin-right: auto; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 768px) { .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .gap-10 { gap: 2.5rem; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .text-center { text-align: center; }
  .font-bold { font-weight: 700; }
  .font-black { font-weight: 900; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-12 { margin-bottom: 3rem; }
  .mb-24 { margin-bottom: 6rem; }
  .mb-32 { margin-bottom: 8rem; }
  .p-8 { padding: 2rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .relative { position: relative; }
  .z-10 { z-index: 10; }
  .text-cerulean { color: var(--clr-cerulean); }
  .bg-cerulean { background-color: var(--clr-cerulean); }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
