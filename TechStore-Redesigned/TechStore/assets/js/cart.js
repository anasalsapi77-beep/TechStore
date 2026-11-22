/* Cart state: stores product IDs and quantities, not stale product snapshots. */
(() => {
  const KEY = 'techStoreCart';
  const { read, write, toast, emitUpdate } = window.TechStore;
  const { getProductById, money, escapeHTML } = window.TechStoreProducts;
  function getCart() {
    const raw = read(KEY, []);
    if (!Array.isArray(raw)) return [];
    const merged = new Map();
    raw.forEach(row => {
      const id = Number(row?.id ?? row?.productId);
      const product = getProductById(id);
      const quantity = Math.max(1, Math.min(product.stock || 99, Number(row?.quantity) || 1));
      if (product) merged.set(id, Math.min(99, (merged.get(id) || 0) + quantity));
    });
    return [...merged.entries()].map(([id, quantity]) => ({ id, quantity }));
  }
  function saveCart(cart = getCart()) { write(KEY, cart); emitUpdate(); }
  function getItems() { return getCart().map(row => { const product = getProductById(row.id); return product ? { ...product, quantity: row.quantity } : null; }).filter(Boolean); }
  function addToCart(id, quantity = 1) {
    const product = getProductById(id); if (!product) return false;
    const cart = getCart(); const existing = cart.find(row => row.id === product.id);
    if (existing) existing.quantity = Math.min(product.stock || 99, existing.quantity + Math.max(1, Number(quantity) || 1));
    else cart.push({ id: product.id, quantity: Math.max(1, Math.min(product.stock || 99, Number(quantity) || 1)) });
    saveCart(cart); toast(`${product.name} added to your cart.`); return true;
  }
  function removeFromCart(id) { const cart = getCart().filter(row => row.id !== Number(id)); saveCart(cart); toast('Item removed from your cart.'); }
  function updateQuantity(id, quantity) {
    const amount = Math.floor(Number(quantity)); if (!Number.isFinite(amount) || amount < 1) { removeFromCart(id); return; }
    const cart = getCart(); const row = cart.find(item => item.id === Number(id)); if (!row) return;
    row.quantity = Math.min(getProductById(id)?.stock || 99, amount); saveCart(cart);
  }
  function clearCart(silent = false) { write(KEY, []); emitUpdate(); if (!silent) toast('Your cart is now empty.'); }
  function subtotal() { return getItems().reduce((sum, item) => sum + item.price * item.quantity, 0); }
  function couponData() {
    const code = String(read('techStoreCoupon', '') || '').trim().toUpperCase();
    const total = subtotal();
    if (!code) return { code: '', discount: 0, message: '' };
    if (code === 'TECH10') return { code, discount: total * .10, message: '10% off your order' };
    if (code === 'WELCOME15' && total >= 150) return { code, discount: total * .15, message: '15% off orders over $150' };
    return { code: '', discount: 0, message: '' };
  }
  function getSummary() {
    const sub = subtotal(); const shipping = !sub ? 0 : (sub >= 250 ? 0 : 12);
    const coupon = couponData(); const discount = Math.min(sub, coupon.discount);
    return { subtotal: sub, shipping, discount, total: Math.max(0, sub + shipping - discount), coupon: coupon.code, itemCount: getItems().reduce((n, item) => n + item.quantity, 0) };
  }
  function renderCart() {
    const container = document.getElementById('cartContainer'); if (!container) return;
    const items = getItems(); const summary = getSummary();
    if (!items.length) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">⌑</div><h2>Your cart is waiting for something good.</h2><p>Explore the collection and add a few favourites.</p><a class="btn btn-primary" href="products.html">Explore products</a></div>`;
    } else {
      container.innerHTML = items.map(item => `<article class="cart-line">
        <a class="cart-line-art" href="product.html?id=${item.id}"><img src="assets/images/products/${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}"></a>
        <div class="cart-line-main"><span class="eyebrow">${escapeHTML(item.category)}</span><h3><a href="product.html?id=${item.id}">${escapeHTML(item.name)}</a></h3><span class="cart-unit-price">${money(item.price)} each</span></div>
        <div class="quantity-control" aria-label="Quantity for ${escapeHTML(item.name)}"><button type="button" data-cart-qty="${item.id}" data-step="-1" aria-label="Decrease quantity">−</button><input type="number" min="1" max="99" value="${item.quantity}" data-cart-quantity="${item.id}" aria-label="Quantity"><button type="button" data-cart-qty="${item.id}" data-step="1" aria-label="Increase quantity">＋</button></div>
        <strong class="cart-line-total">${money(item.price * item.quantity)}</strong>
        <button class="remove-button" type="button" data-remove-cart="${item.id}" aria-label="Remove ${escapeHTML(item.name)}">×</button>
      </article>`).join('');
    }
    const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
    set('cartSubtotal', money(summary.subtotal)); set('cartShipping', summary.shipping ? money(summary.shipping) : (summary.subtotal ? 'Free' : money(0)));
    set('cartDiscount', summary.discount ? `−${money(summary.discount)}` : money(0)); set('cartTotal', money(summary.total));
    const couponInput = document.getElementById('couponCode'); if (couponInput && !couponInput.value) couponInput.value = summary.coupon;
    const progress = document.getElementById('shippingProgress'); if (progress) { const pct = Math.min(100, summary.subtotal / 250 * 100); progress.style.width = `${pct}%`; }
    const progressText = document.getElementById('shippingMessage'); if (progressText) progressText.textContent = summary.subtotal >= 250 ? 'You unlocked free shipping.' : `Add ${money(250 - summary.subtotal)} more for free shipping.`;
    const checkout = document.getElementById('checkoutLink'); if (checkout) { checkout.classList.toggle('is-disabled', !items.length); checkout.setAttribute('aria-disabled', String(!items.length)); checkout.href = items.length ? 'checkout.html' : 'products.html'; checkout.innerHTML = items.length ? 'Continue to checkout <span>↗</span>' : 'Continue shopping <span>↗</span>'; }
  }
  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add-to-cart]'); if (add) { event.preventDefault(); const id = Number(add.dataset.addToCart); const qty = document.querySelector('[data-product-quantity]'); addToCart(id, qty && add.dataset.useQuantity === 'true' ? qty.value : 1); return; }
    const remove = event.target.closest('[data-remove-cart]'); if (remove) { removeFromCart(remove.dataset.removeCart); renderCart(); return; }
    const step = event.target.closest('[data-cart-qty]'); if (step) { const id = Number(step.dataset.cartQty); const row = step.closest('.quantity-control'); const input = row?.querySelector('[data-cart-quantity]'); updateQuantity(id, Number(input?.value || 1) + Number(step.dataset.step)); renderCart(); }
  });
  document.addEventListener('change', event => { const input = event.target.closest('[data-cart-quantity]'); if (input) { updateQuantity(input.dataset.cartQuantity, input.value); renderCart(); } });
  document.addEventListener('submit', event => {
    if (event.target.id !== 'couponForm') return; event.preventDefault();
    const input = event.target.querySelector('#couponCode'); const code = String(input?.value || '').trim().toUpperCase();
    if (code === 'TECH10' || (code === 'WELCOME15' && subtotal() >= 150)) { write('techStoreCoupon', code); toast(`Coupon ${code} applied.`); }
    else { write('techStoreCoupon', ''); toast('That code is invalid or your order does not meet its minimum.', 'error'); }
    renderCart();
  });
  window.addEventListener('techstore:update', renderCart);
  window.TechStoreCart = { getCart, getItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, getSummary, renderCart };
  window.addToCart = addToCart; window.removeFromCart = removeFromCart; window.updateQuantity = updateQuantity; window.calculateCartTotal = subtotal; window.displayCart = renderCart;
})();
