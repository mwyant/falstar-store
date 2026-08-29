<script>
  import Nebula from '$lib/components/Nebula.svelte';
  import books from '$lib/data/books.json';
  import QRCode from 'qrcode';

  const eventBooks = books.filter((book) => book.available);
  // NY generally treats electronically delivered ebooks as nontaxable.
  // Confirm taxability with a tax professional before changing this rate.
  const taxRate = 0;
  const paypalHandle = 'mikewyantjr';
  let selectedBook = eventBooks[0];
  let orderReference = '';
  let qrCode = '';
  let copied = false;

  $: subtotal = Number(selectedBook?.price ?? 0);
  $: tax = Math.round(subtotal * taxRate * 100) / 100;
  $: total = Math.round((subtotal + tax) * 100) / 100;
  $: paypalUrl = `https://paypal.me/${paypalHandle}/${total.toFixed(2)}USD`;

  function createCheckout() {
    orderReference = `FS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    copied = false;
    if (total === 0) {
      qrCode = '';
      return;
    }
    QRCode.toDataURL(paypalUrl, { width: 320, margin: 2 }).then((url) => {
      qrCode = url;
    });
  }

  async function copyReference() {
    await navigator.clipboard.writeText(orderReference);
    copied = true;
  }
</script>

<svelte:head>
  <title>Event Ebook Store // Falstar Publishing</title>
  <meta name="description" content="Purchase Falstar Publishing ebooks at the event." />
</svelte:head>

<Nebula />

<main class="container mx-auto px-4 relative z-10" style="padding-block: clamp(4rem, 8vw, 7rem);">
  <div class="max-w-5xl mx-auto">
    <header class="hud-panel p-8 md:p-12 mb-8 text-center">
      <p class="eyebrow text-cerulean/50 mb-4">Falstar Publishing // Event Store</p>
      <h1 class="type-display font-black text-white uppercase italic glow-text mb-6">Take A Story Home</h1>
      <p class="text-text/80 max-w-2xl mx-auto leading-relaxed">
        Choose one ebook, calculate the tax-inclusive total, then scan the PayPal QR code. Payment is manually verified before Falstar Publishing delivers the ebook.
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {#each eventBooks as book}
        <article class:hud-panel={selectedBook?.id === book.id} class="hud-panel overflow-hidden flex flex-col">
          <img src={book.cover} alt={book.title} class="w-full aspect-[2/3] object-cover" />
          <div class="p-6 flex flex-col flex-1">
            <p class="eyebrow text-cerulean/55 mb-3">{book.series}</p>
            <h2 class="text-2xl font-black text-white uppercase italic mb-3">{book.title}</h2>
            <p class="text-sm text-text/70 leading-relaxed flex-1 mb-6">{book.description}</p>
            <div class="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <strong class="text-cerulean text-xl">{book.price === '0.00' ? 'FREE' : `$${book.price}`}</strong>
              <button type="button" class="bg-cerulean text-black px-5 py-3 font-black uppercase text-xs tracking-widest hover:bg-white" onclick={() => { selectedBook = book; createCheckout(); }}>{book.price === '0.00' ? 'Claim' : 'Select'}</button>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <section class="hud-panel p-6 md:p-8 mb-8">
      <div class="grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <p class="eyebrow text-cerulean/55 mb-3">Secure payment // PayPal.Me</p>
          <h2 class="text-3xl font-black text-white uppercase italic mb-4">{selectedBook?.title}</h2>
          <dl class="text-text/75 space-y-2 mb-6">
            <div class="flex justify-between gap-8"><dt>Item</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div class="flex justify-between gap-8"><dt>Tax ({(taxRate * 100).toFixed(2)}%)</dt><dd>${tax.toFixed(2)}</dd></div>
            <div class="flex justify-between gap-8 border-t border-white/10 pt-2 text-white font-black"><dt>Total to PayPal</dt><dd>${total.toFixed(2)} USD</dd></div>
          </dl>
          <button type="button" class="bg-cerulean text-black px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-white" onclick={createCheckout}>{total === 0 ? 'Claim Free Ebook' : 'Generate Payment QR'}</button>
          {#if orderReference}
            <div class="mt-6 text-sm text-text/75 space-y-2">
              <p>Your payment reference: <strong class="text-white">{orderReference}</strong></p>
              <p>{total === 0 ? 'Email this reference and your delivery address to mike@falstarpublishing.com.' : 'Include this reference in the PayPal note, then email your delivery address to mike@falstarpublishing.com.'}</p>
              <button type="button" class="text-cerulean underline" onclick={copyReference}>{copied ? 'Copied' : 'Copy reference'}</button>
            </div>
          {/if}
        </div>
        {#if qrCode}
          <div class="bg-white p-4 w-fit mx-auto">
            <img src={qrCode} alt={`PayPal payment QR code for $${total.toFixed(2)}`} width="240" height="240" />
          </div>
        {:else}
          <div class="border border-white/10 p-8 text-center text-text/50 max-w-xs">Select a title and generate its payment QR code.</div>
        {/if}
      </div>
      <p class="text-xs text-text/50 mt-8">For electronically delivered ebooks, New York generally treats the sale as nontaxable, so the configured rate is 0%. ZIP 13439 alone cannot determine a complete tax obligation. Confirm the treatment with a tax professional before sales begin. PayPal.Me cannot confirm payment to this page; verify each payment in PayPal before delivery.</p>
    </section>

    <section class="hud-panel p-6 md:p-8 mt-8 text-center">
      <h2 class="eyebrow text-cerulean mb-3">Need Help?</h2>
      <p class="text-text/70">For payment or delivery questions, email <a href="mailto:mike@falstarpublishing.com">mike@falstarpublishing.com</a>.</p>
    </section>
  </div>
</main>
