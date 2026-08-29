# falstar-store

Static ebook storefront for Falstar Publishing.

## Branch workflow

`dev` is the only development and integration branch. Make and test storefront changes there, then promote the tested `dev` tip to `main` when a production release is approved. `main` is the production store branch and must not receive direct edits or direct feature commits.

Promotion is a deliberate release operation, not an automatic deployment. Keep `main` and `dev` aligned after each approved promotion, and deploy Cloud Run production only after final testing and explicit approval.

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
