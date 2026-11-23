/* Wishlist state and rendering. */
(() => {
  const KEY = 'techStoreWishlist'; const { read, write, toast, emitUpdate } = window.TechStore;
  const { getProductById, money, escapeHTML } = window.TechStoreProducts;
  function getWishlist() {
    const raw = read(KEY, []); if (!Array.isArray(raw)) return [];
    return [...new Set(raw.map(row => Number(typeof row === 'object' ? row.id : row)).filter(id => getProductById(id)))];
  }
  function save(list) { write(KEY, list); emitUpdate(); }
  function addToWishlist(id) { const product = getProductById(id); if (!product) return false; const list = getWishlist(); if (list.includes(product.id)) { toast('This item is already in your wishlist.', 'info'); return false; } list.push(product.id); save(list); toast(`${product.name} saved to your wishlist.`); return true; }
  function removeFromWishlist(id) { save(getWishlist().filter(value => value !== Number(id))); toast('Item removed from wishlist.'); }
  function renderWishlist() {
    const container = document.getElementById('wishlistContainer'); if (!container) return;
    const items = getWishlist().map(getProductById).filter(Boolean);
    container.innerHTML = items.length ? items.map(product => `<article class="product-card reveal-card"><a class="product-art" href="product.html?id=${product.id}"><img src="assets/images/products/${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy"></a><div class="product-info"><div class="product-meta"><span>${escapeHTML(product.category)}</span><span class="rating">★ ${product.rating.toFixed(1)}</span></div><h3><a href="product.html?id=${product.id}">${escapeHTML(product.name)}</a></h3><div class="product-buy-row"><strong>${money(product.price)}</strong><button class="icon-button add-icon" data-add-to-cart="${product.id}" type="button" aria-label="Add to cart">＋</button></div><button class="text-action danger-action" type="button" data-remove-wishlist="${product.id}">Remove from wishlist</button></div></article>`).join('') : `<div class="empty-state"><div class="empty-icon">♡</div><h2>No saved pieces yet.</h2><p>Keep the products you love close at hand.</p><a class="btn btn-primary" href="products.html">Discover the collection</a></div>`;
  }
  document.addEventListener('click', event => { const add = event.target.closest('[data-add-to-wishlist]'); if (add) { addToWishlist(add.dataset.addToWishlist); return; } const remove = event.target.closest('[data-remove-wishlist]'); if (remove) { removeFromWishlist(remove.dataset.removeWishlist); renderWishlist(); } });
  window.addEventListener('techstore:update', renderWishlist);
  window.TechStoreWishlist = { getWishlist, addToWishlist, removeFromWishlist, renderWishlist };
  window.addToWishlist = addToWishlist; window.removeFromWishlist = removeFromWishlist; window.displayWishlist = renderWishlist;
})();
