/* Page controllers for the home, catalogue, detail, cart, checkout and contact views. */
(() => {
  const { products, getProductById, productCard, money, escapeHTML } = window.TechStoreProducts;
  const TS = window.TechStore;
  const page = document.body.dataset.page;
  function renderGrid(target, items) { if (target) target.innerHTML = items.length ? items.map(productCard).join('') : '<div class="no-results"><span>⌕</span><h3>No products found</h3><p>Try another search or category.</p></div>'; }
  if (page === 'home') {
    renderGrid(document.getElementById('featuredProducts'), products.filter(item => item.featured).slice(0, 4));
    renderGrid(document.getElementById('bestSellers'), [...products].sort((a,b) => b.rating-a.rating).slice(0, 3));
    renderGrid(document.getElementById('newArrivals'), products.filter(item => item.badge === 'NEW ARRIVAL'));
  }
  if (page === 'products') {
    const grid = document.getElementById('productsGrid'); const search = document.getElementById('productSearch'); const sort = document.getElementById('sortProducts'); const count = document.getElementById('resultsCount');
    let category = new URLSearchParams(location.search).get('category') || 'All'; let query = '';
    const categories = ['All', ...new Set(products.map(item => item.category))];
    const filterHost = document.getElementById('categoryFilters');
    if (filterHost) filterHost.innerHTML = categories.map(value => `<button class="filter-chip ${value.toLowerCase() === category.toLowerCase() ? 'active' : ''}" type="button" data-category-filter="${escapeHTML(value)}">${escapeHTML(value)}</button>`).join('');
    function update() {
      let result = products.filter(item => (category === 'All' || item.category.toLowerCase() === category.toLowerCase()) && `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query));
      if (sort?.value === 'price-low') result.sort((a,b) => a.price-b.price);
      else if (sort?.value === 'price-high') result.sort((a,b) => b.price-a.price);
      else if (sort?.value === 'rating') result.sort((a,b) => b.rating-a.rating);
      else if (sort?.value === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
      if (count) count.textContent = `${result.length} ${result.length === 1 ? 'product' : 'products'}`;
      renderGrid(grid, result);
    }
    search?.addEventListener('input', () => { query = search.value.trim().toLowerCase(); update(); }); sort?.addEventListener('change', update);
    filterHost?.addEventListener('click', event => { const button = event.target.closest('[data-category-filter]'); if (!button) return; category = button.dataset.categoryFilter; filterHost.querySelectorAll('button').forEach(node => node.classList.toggle('active', node === button)); update(); });
    update();
  }
  if (page === 'product') {
    const host = document.getElementById('productDetails'); const id = new URLSearchParams(location.search).get('id'); const product = getProductById(id);
    if (host && product) {
      document.title = `${product.name} | TechStore`;
      host.innerHTML = `<div class="detail-art"><span class="product-badge">${escapeHTML(product.badge || 'TECHSTORE PICK')}</span><img src="assets/images/products/${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}"></div>
      <div class="detail-copy"><a class="back-link" href="products.html">← Back to collection</a><span class="eyebrow">${escapeHTML(product.category)} · In stock</span><h1>${escapeHTML(product.name)}</h1><div class="detail-rating"><span>★★★★★</span> ${product.rating.toFixed(1)} <small>(${product.reviews} verified-style demo reviews)</small></div><div class="detail-price"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del><span class="save-label">Save ${Math.round((1-product.price/product.oldPrice)*100)}%</span>` : ''}</div><p class="detail-description">${escapeHTML(product.description)}</p><div class="stock-note"><span class="stock-dot"></span> ${product.stock} units available in demo inventory</div><div class="detail-purchase"><div class="quantity-control"><button type="button" data-detail-qty="-1" aria-label="Decrease quantity">−</button><input type="number" min="1" max="${product.stock}" value="1" data-product-quantity aria-label="Quantity"><button type="button" data-detail-qty="1" aria-label="Increase quantity">＋</button></div><button class="btn btn-primary" type="button" data-add-to-cart="${product.id}" data-use-quantity="true">Add to cart <span>＋</span></button><button class="icon-button detail-heart" type="button" data-add-to-wishlist="${product.id}" aria-label="Save to wishlist">♡</button></div><div class="detail-assurances"><span>◇ Secure demo checkout</span><span>↗ Free shipping over $250</span><span>⌁ Support when you need it</span></div></div>
      <div class="spec-panel"><div class="section-heading compact-heading"><span class="eyebrow">At a glance</span><h2>Designed around the details.</h2></div><div class="spec-grid">${product.specs.map((spec,index) => `<div class="spec-item"><span>0${index+1}</span><p>${escapeHTML(spec)}</p></div>`).join('')}</div></div>`;
      host.querySelectorAll('[data-detail-qty]').forEach(button => button.addEventListener('click', () => { const input = host.querySelector('[data-product-quantity]'); input.value = Math.max(1, Math.min(product.stock, Number(input.value || 1) + Number(button.dataset.detailQty))); }));
      const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3); const relatedHost = document.getElementById('relatedProducts'); if (relatedHost) renderGrid(relatedHost, related.length ? related : products.filter(item => item.id !== product.id).slice(0,3));
    } else if (host) host.innerHTML = `<div class="empty-state"><div class="empty-icon">?</div><h2>We couldn't find that product.</h2><p>The link may be incomplete or the item may have moved.</p><a class="btn btn-primary" href="products.html">Browse products</a></div>`;
  }
  if (page === 'cart') window.TechStoreCart.renderCart();
  if (page === 'wishlist') window.TechStoreWishlist.renderWishlist();
  if (page === 'checkout') {
    const form = document.getElementById('checkoutForm'); const summaryHost = document.getElementById('checkoutItems'); const totalHost = document.getElementById('checkoutTotal'); const empty = document.getElementById('checkoutEmpty');
    function renderSummary() {
      const items = window.TechStoreCart.getItems(); const summary = window.TechStoreCart.getSummary();
      if (!items.length) { if (form) form.hidden = true; if (empty) empty.hidden = false; if (summaryHost) summaryHost.innerHTML = ''; }
      else { if (form) form.hidden = false; if (empty) empty.hidden = true; if (summaryHost) summaryHost.innerHTML = items.map(item => `<div class="checkout-item"><img src="assets/images/products/${escapeHTML(item.image)}" alt=""><div><strong>${escapeHTML(item.name)}</strong><small>Qty ${item.quantity}</small></div><b>${money(item.price*item.quantity)}</b></div>`).join(''); }
      const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
      set('checkoutSubtotal',money(summary.subtotal)); set('checkoutShipping',summary.shipping?money(summary.shipping):(summary.subtotal?'Free':money(0))); set('checkoutDiscount',summary.discount?`−${money(summary.discount)}`:money(0)); if (totalHost) totalHost.textContent = money(summary.total);
    }
    renderSummary();
    form?.addEventListener('submit', event => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const items = window.TechStoreCart.getItems(); if (!items.length) { TS.toast('Your cart is empty.', 'error'); return; }
      const summary = window.TechStoreCart.getSummary(); const orderId = `TS-${Date.now().toString().slice(-8)}`;
      const order = { id: orderId, date: new Date().toISOString(), customer: { name: form.customerName.value.trim(), email: form.customerEmail.value.trim(), phone: form.customerPhone.value.trim(), address: form.customerAddress.value.trim(), city: form.customerCity.value.trim(), postalCode: form.customerPostal.value.trim() }, items: items.map(({id,name,price,quantity}) => ({id,name,price,quantity})), summary, paymentMethod: 'Cash on delivery — demo' };
      const orders = TS.read('techStoreOrders', []); orders.unshift(order); TS.write('techStoreOrders', orders); window.TechStoreCart.clearCart(true); TS.write('techStoreCoupon','');
      form.hidden = true; const success = document.getElementById('orderSuccess'); if (success) { success.hidden = false; success.querySelector('[data-order-number]').textContent = orderId; success.querySelector('[data-order-email]').textContent = order.customer.email; } if (empty) empty.hidden = true;
      if (summaryHost) summaryHost.innerHTML = ''; if (totalHost) totalHost.textContent = money(0); TS.toast('Demo order created successfully. No payment was processed.');
    });
  }
  if (page === 'contact') {
    const form = document.getElementById('contactForm'); form?.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const messages = TS.read('techStoreMessages', []); messages.unshift({ name: form.contactName.value.trim(), email: form.contactEmail.value.trim(), message: form.contactMessage.value.trim(), date: new Date().toISOString() }); TS.write('techStoreMessages', messages); form.reset(); TS.toast('Message saved in this browser demo. Connect a backend to receive real enquiries.', 'info'); });
  }
})();
