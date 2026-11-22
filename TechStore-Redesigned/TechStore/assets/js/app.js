/* Shared navigation, badges, reveal effects and demo newsletter behaviour. */
(() => {
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    menu.addEventListener('click', () => { const open = !nav.classList.contains('active'); nav.classList.toggle('active', open); menu.classList.toggle('active', open); menu.setAttribute('aria-expanded', String(open)); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('active'); menu.classList.remove('active'); menu.setAttribute('aria-expanded', 'false'); }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { nav.classList.remove('active'); menu.classList.remove('active'); menu.setAttribute('aria-expanded', 'false'); } });
  }
  const scrollButton = document.getElementById('scrollTopBtn');
  if (scrollButton) { const update = () => scrollButton.classList.toggle('is-visible', window.scrollY > 420); window.addEventListener('scroll', update, { passive: true }); update(); scrollButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
  function updateBadges() {
    const cartCount = window.TechStoreCart?.getItems().reduce((sum, item) => sum + item.quantity, 0) || 0;
    const wishCount = window.TechStoreWishlist?.getWishlist().length || 0;
    document.querySelectorAll('[data-cart-count]').forEach(node => { node.textContent = cartCount; node.classList.toggle('has-items', cartCount > 0); node.setAttribute('aria-label', `${cartCount} items in cart`); });
    document.querySelectorAll('[data-wishlist-count]').forEach(node => { node.textContent = wishCount; node.classList.toggle('has-items', wishCount > 0); node.setAttribute('aria-label', `${wishCount} saved items`); });
  }
  window.addEventListener('techstore:update', updateBadges); window.addEventListener('storage', updateBadges); updateBadges();
  const revealTargets = document.querySelectorAll('.section-heading, .category-card, .product-card, .feature-card, .quote-card, .editorial-panel');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } }), { threshold: .12 });
    revealTargets.forEach(node => observer.observe(node));
  } else revealTargets.forEach(node => node.classList.add('is-revealed'));
  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault(); const input = form.querySelector('input[type="email"]'); const email = input?.value.trim().toLowerCase(); if (!email) return;
    const list = window.TechStore.read('techStoreNewsletter', []); if (!list.includes(email)) { list.push(email); window.TechStore.write('techStoreNewsletter', list); }
    window.TechStore.toast('Subscribed in this demo. Connect an email service to send real campaigns.', 'info'); form.reset();
  }));
  document.querySelectorAll('[data-current-year]').forEach(node => node.textContent = new Date().getFullYear());
})();
