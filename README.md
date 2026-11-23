# TechStore

A responsive, multi-page technology storefront demo built with HTML, CSS and vanilla JavaScript.

## Features

- Home page, product catalogue and product detail pages
- Product search, category filtering and sorting
- Shopping cart and wishlist
- Demo checkout and contact/newsletter forms
- Responsive navigation and mobile layouts
- Browser storage for demo cart, wishlist and form state

## Run locally

Open `index.html` in a browser, or start a local static server from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/pages.yml`. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow then publishes the repository root when changes are pushed to `main`.

## Important demo limitations

TechStore is a front-end demonstration. It has no backend, authentication, live stock, order fulfilment, email delivery or payment gateway. Checkout creates a local demo order in the current browser and does not charge anyone. Prices are illustrative USD values.
