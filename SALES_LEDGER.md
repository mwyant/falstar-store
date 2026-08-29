# Manual Sales Ledger

Use `SALES_LEDGER.csv` as the private reconciliation template. Keep the working copy outside the public repository if it contains buyer information.

For each sale:

1. Generate the payment QR code on `/event` and give the buyer the displayed order reference.
2. Confirm the buyer included that reference in the PayPal note.
3. Verify the payment in PayPal activity. Match the gross total, currency, status, and reference before delivery.
4. Record the PayPal transaction ID and buyer email in the ledger.
5. Email the ebook only after verification, then set `delivery_status` to `sent`.
6. Record refunds, reversals, duplicate payments, or disputes in `notes` and do not deliver until resolved.

The event page uses `taxRate = 0` because New York generally treats electronically delivered ebooks as nontaxable. ZIP `13439` alone is not enough to determine a complete tax obligation, and digital-product tax treatment can change. Confirm the treatment with a tax professional before opening sales. If tax applies, update `taxRate` in `src/routes/event/+page.svelte`; the displayed total is the amount encoded in the QR code and PayPal.Me URL.
