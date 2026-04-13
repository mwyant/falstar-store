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
  <header class="text-center mb-32 pt-12">
    <div class="inline-block relative mb-12">
      <div class="absolute -inset-4 bg-cerulean/20 blur-2xl rounded-full animate-pulse"></div>
      <img src="/images/logo.webp" alt="Falstar Publishing" class="relative w-32 md:w-40 opacity-90 brightness-125" />
    </div>
    <h1 class="text-6xl md:text-8xl font-black mb-6 tracking-[-0.08em] text-white uppercase italic skew-x-[-10deg] glow-text">
      Databank
    </h1>
    <div class="flex items-center justify-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-cerulean/60">
      <div class="h-[1px] w-12 bg-cerulean/30"></div>
      <span>Neural Interface v4.0.1</span>
      <div class="h-[1px] w-12 bg-cerulean/30"></div>
    </div>
  </header>

  {#each series as s}
    <section id={s.name.toLowerCase().replace(/ /g, '-')} class="mb-48">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
        <div>
          <h2 class="text-4xl md:text-5xl font-black text-white leading-none uppercase mb-2 italic skew-x-[-5deg]">{s.name}</h2>
          <p class="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-cerulean/40">Sector // 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</p>
        </div>
        <div class="h-[2px] flex-1 bg-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-cerulean/40 to-transparent w-1/2 animate-[shimmer_3s_infinite]"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {#each s.books as book}
          <a href="/book/{book.id}" class="hud-panel group block relative h-full transition-all duration-500 hover:scale-[1.02] hover:z-20">
            <div class="hud-corner-accent hud-corner-tl"></div>
            <div class="hud-corner-accent hud-corner-tr"></div>
            <div class="hud-corner-accent hud-corner-bl"></div>
            <div class="hud-corner-accent hud-corner-br"></div>
            <div class="hud-scanlines"></div>
            
            <div class="relative aspect-[3/4.5] overflow-hidden bg-black/60 m-2">
              <img 
                src={book.cover} 
                alt={book.title} 
                class="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                on:error={(e) => e.target.src = 'https://via.placeholder.com/400x600/030008/00e5ff?text=DATA+ENCRYPTED'}
              />
              <!-- Data Overlays -->
              <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div class="text-[8px] font-mono text-cerulean/40 mb-1 flex justify-between uppercase">
                  <span>ID: {book.id.toUpperCase()}</span>
                  <span>STAT: VERIFIED</span>
                </div>
              </div>
            </div>

            <div class="p-6 pt-2">
              <h3 class="text-xl font-black text-white/90 group-hover:text-cerulean transition-colors mb-4 leading-tight uppercase tracking-tight">
                {book.title}
              </h3>
              
              <div class="flex items-center justify-between border-t border-white/10 pt-4">
                <span class="text-2xl font-black tracking-tighter text-white/80 group-hover:text-white transition-colors">${book.price}</span>
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-cerulean opacity-60 group-hover:opacity-100 transition-opacity">Access Terminal →</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}

  <footer class="text-center opacity-20 text-[10px] mt-48 tracking-[0.5em] uppercase pb-16">
    <p>&copy; {new Date().getFullYear()} Falstar Publishing LLC // Neural interface stable // v4.0.1-dev</p>
  </footer>
</main>

<style>
  .container { width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 640px) { .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .gap-6 { gap: 1.5rem; }
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
