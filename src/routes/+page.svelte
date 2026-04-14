<script>
  import { onMount } from 'svelte';
  import Nebula from '$lib/components/Nebula.svelte';
  import books from '$lib/data/books.json';

  const convergenceBooks = books.filter((b) => b.series === 'The Anisian Convergence');
  const whitestoneBooks = books.filter((b) => b.series === 'The Misadventures of Darren Whitestone');
  const otherBooks = books.filter((b) => b.series === 'The Wrong Gods');

  const series = [
    {
      key: 'convergence',
      name: 'The Anisian Convergence',
      books: convergenceBooks,
      clearance: 'Aether Corridor',
      brief: 'Far-future military space opera dossiers, starfront briefings, and hardline tactical data from the outer corridor.'
    },
    {
      key: 'whitestone',
      name: 'The Misadventures of Darren Whitestone',
      books: whitestoneBooks,
      clearance: 'Civil Distortion',
      brief: 'Urban fantasy incident reports with magical sheen, rogue chaos, and a few too many improbable miracles.'
    },
    {
      key: 'other',
      name: 'Other Books by Mike Wyant Jr.',
      books: otherBooks,
      clearance: 'Unfinished Side Project',
      brief: 'Cooler, unfinished side-project files kept separate while the main storefront stays locked to the active catalog.'
    }
  ];

  const totalAssets = books.length;
  let activeSection = 'convergence';
  let hoveredSection = '';
  let convergenceCursor = { x: 50, y: 42 };
  let convergencePower = 0;
  let convergenceRaf = 0;
  let darrenCursor = { x: 68, y: 32 };

  /** @param {string} name */
  const getSectorCode = (name) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 4)
      .toUpperCase()
      .padEnd(4, 'X');

  /** @param {{ id: string; bookNum?: number }} book */
  const getPacketCode = (book) => `${book.id.toUpperCase()}-${String(book.bookNum ?? 0).padStart(2, '0')}`;

  /** @param {{ bookNum?: number; prequel?: boolean; standalone?: boolean }} book */
  const getPacketStatus = (book) => {
    if (book.prequel) return 'Prequel Asset';
    if (book.standalone) return 'Standalone File';
    return `Sequence ${String(book.bookNum).padStart(2, '0')}`;
  };

  const morphSection = () => hoveredSection || activeSection;

  /** @param {string} key */
  const setHover = (key) => {
    hoveredSection = key;
    if (key === 'convergence') {
      if (convergenceRaf) cancelAnimationFrame(convergenceRaf);

      const start = performance.now();
      const tick = /** @param {number} now */ (now) => {
        const elapsed = now - start;
        convergencePower = Math.min(1, elapsed / 1800);
        convergenceRaf = requestAnimationFrame(tick);
      };

      convergenceRaf = requestAnimationFrame(tick);
    }
  };

  /** @param {string} key */
  const clearHover = (key) => {
    if (hoveredSection === key) hoveredSection = '';

    if (key === 'convergence') {
      if (convergenceRaf) cancelAnimationFrame(convergenceRaf);
      convergenceRaf = 0;
      convergencePower = 0;
    }
  };

  /** @param {PointerEvent} event */
  const updateConvergenceCursor = (event) => {
    const rect = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
    convergenceCursor = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    };
  };

  /** @param {PointerEvent} event */
  const updateDarrenCursor = (event) => {
    const rect = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
    darrenCursor = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    };
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement && visible.target.dataset.section) {
          activeSection = visible.target.dataset.section;
        }
      },
      { threshold: [0.25, 0.45, 0.65] }
    );

    document.querySelectorAll('[data-archive-section]').forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  });
</script>

<Nebula />

<main class="archive-shell container mx-auto px-4 relative z-10" style="padding-block: clamp(5rem, 7vw, 7rem);">
  <header class="archive-hero hud-panel" style="padding-top: clamp(1rem, 2.5vw, 2.5rem);">
    <div class="archive-hero__grid">
      <div>
        <div class="inline-block relative mb-12">
          <div class="absolute -inset-4 bg-cerulean/20 blur-2xl rounded-full animate-pulse"></div>
          <img src="/images/logo.webp" alt="Falstar Publishing" class="relative w-32 md:w-40 opacity-90 brightness-125" />
        </div>
        <h1 class="type-display font-black mb-6 text-white uppercase italic glow-text">
          <span class="inline-block">Databank</span>
        </h1>
        <div class="eyebrow flex items-center gap-4 text-cerulean/60" style="margin-bottom: clamp(1rem, 2vw, 1.6rem);">
          <div class="h-[1px] w-12 bg-cerulean/30"></div>
            <span class="inline-block">Neural Interface v5.1.4 // Archive Index</span>
        </div>
        <p class="archive-hero__lede type-body-lg">
          A classified storefront archive for premium speculative fiction, surfaced as tactical packets inside a live neural bridge.
          Browse by sector, inspect dossier-ready assets, and keep the cover art at the center of every acquisition path.
        </p>
      </div>

      <div class="archive-hero__metrics">
        <div class="archive-hero__metric">
          <span class="eyebrow">Asset Count</span>
          <strong>{totalAssets}</strong>
        </div>
        <div class="archive-hero__metric">
          <span class="eyebrow">Series</span>
          <strong>{series.length}</strong>
        </div>
        <div class="archive-hero__metric">
          <span class="eyebrow">Delivery</span>
          <strong>Direct Stream</strong>
        </div>
        <div class="archive-hero__metric">
          <span class="eyebrow">Status</span>
          <strong>Archive Live</strong>
        </div>
      </div>
    </div>
  </header>

  {#each series as s}
    <section
      id={s.key}
      data-archive-section
      data-section={s.key}
      role="group"
      aria-label={s.name}
      class={`archive-section archive-section--${s.key}`}
      class:section-active={morphSection() === s.key}
      style={
        s.key === 'whitestone'
          ? `--cat-x:${darrenCursor.x}%; --cat-y:${darrenCursor.y}%;`
          : s.key === 'convergence'
            ? `--conv-x:${convergenceCursor.x}%; --conv-y:${convergenceCursor.y}%; --conv-power:${convergencePower};`
            : ''
      }
      on:mouseenter={() => setHover(s.key)}
      on:mouseleave={() => clearHover(s.key)}
      on:focusin={() => setHover(s.key)}
      on:focusout={() => clearHover(s.key)}
      on:pointermove={s.key === 'whitestone' ? updateDarrenCursor : s.key === 'convergence' ? updateConvergenceCursor : undefined}
    >
      {#if s.key === 'convergence'}
        <div class="convergence-sprite" aria-hidden="true"></div>
      {/if}
      <div class="archive-section__header px-4">
        <div>
          <p class="eyebrow text-cerulean/40" style="margin-bottom: 0.8rem;">
            Sector // 0x{getSectorCode(s.name)}
          </p>
          <h2 class="type-section font-black text-white uppercase mb-2 italic">{s.name}</h2>
          <p class="archive-section__deck">{s.brief}</p>
        </div>

        <div class="archive-section__meta">
          <span class="dossier-pill dossier-pill--ghost">Files // {s.books.length}</span>
          <span class="dossier-pill dossier-pill--ghost">Clearance // {s.clearance}</span>
          <span class="dossier-pill dossier-pill--ghost">Cover-First Packets</span>
        </div>

        {#if s.key === 'whitestone'}
          <span class="whitestone-eye" aria-hidden="true"></span>
        {/if}
      </div>

      <div class="archive-grid px-4">
        {#each s.books as book}
          <a href="/book/{book.id}" class="data-packet hud-panel group block relative h-full">
            <div class="data-packet__frame">
              <div class="data-packet__meta eyebrow">
                <span>Packet // {getPacketCode(book)}</span>
                <span>{getPacketStatus(book)}</span>
              </div>

              <div class="data-packet__cover-shell">
                <div class="data-packet__cover">
                  <img
                    src={book.cover}
                    alt={book.title}
                    class="transition-all duration-700"
                    on:error={(event) => (/** @type {HTMLImageElement} */ (event.currentTarget)).src = 'https://via.placeholder.com/400x600/030008/00e5ff?text=DATA+ENCRYPTED'}
                  />

                  <div class="data-packet__cover-label">
                    <span>ID // {book.id.toUpperCase()}</span>
                    <span>Asset Verified</span>
                  </div>
                </div>
              </div>

              <div class="data-packet__body">
                <div class="data-packet__kicker eyebrow text-cerulean/50">
                  <span>{book.genre}</span>
                  <span>{getPacketStatus(book)}</span>
                </div>
                <h3 class="data-packet__title type-card-title font-black text-white/90 uppercase">
                  {book.title}
                </h3>
                <p class="data-packet__summary">{book.description}</p>

                <div class="data-packet__footer">
                  <span class="data-packet__price">${book.price}</span>
                  <span class="data-packet__action">Open Dossier -></span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}

  <footer class="text-center opacity-20 text-[10px] tracking-[0.5em] uppercase" style="padding-bottom: clamp(2rem, 5vw, 4rem);">
    <p>&copy; {new Date().getFullYear()} Falstar Publishing LLC // Neural interface stable // v5.1.4 archive</p>
  </footer>
</main>

<style>
  .container { width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .font-black { font-weight: 900; }
  .mb-12 { margin-bottom: 3rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .relative { position: relative; }
  .z-10 { z-index: 10; }
</style>
