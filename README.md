# falstar-store

Static ebook storefront for Falstar Publishing.

## Event sales

The event storefront is available at `/event`. Each available title in `src/lib/data/books.json` uses these provider-neutral fields:

- `available`: whether the title is offered in the storefront.
- `purchaseUrl`: external hosted checkout URL. Leave blank until the link is ready.
- `fulfillment`: delivery method. Event titles use `manual-email`.

Checkout is hosted externally. Falstar Publishing manually verifies payment and sends the ebook to the purchaser email confirmed during checkout. Keep the transaction ledger outside this repository.

No payment SDK, payment API credentials, webhooks, cart, or automated fulfillment service are included in this static site.

## Local verification

```sh
npm run check
npm run lint
npm run build
```

Do not commit `.env` files. This storefront does not require payment or fulfillment credentials.
