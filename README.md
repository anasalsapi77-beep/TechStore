# TechStore — redesigned storefront

A responsive front-end demo storefront based on the original TechStore project.

## Run locally

Open `index.html` in a browser, or serve this directory with a local static server (recommended):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included

- Home page, product catalogue, product detail, cart, wishlist, checkout and contact pages.
- Product search, category filters, sorting, quantity controls, wishlist actions, coupon codes and cart totals.
- Local SVG product illustrations, so product art does not depend on the missing image folder from the original upload.
- Responsive navigation, mobile layout, reveal effects, status toasts and accessible form labels.
- Local browser storage for the cart, wishlist, demo orders, contact messages and newsletter signups.

## Demo limitations

This is a browser-only storefront. It does **not** include a server, live inventory, real order fulfilment, an email delivery service, authentication or a payment gateway. Checkout creates a demo order in the current browser only and does not charge a customer. Contact and newsletter forms save data locally and do not send messages. Connect a secure backend, real catalogue/inventory API and payment provider before using it as a live commercial store.

Prices are illustrative USD values inherited/created for this demo. Update the product catalogue in `assets/js/products.js`.
