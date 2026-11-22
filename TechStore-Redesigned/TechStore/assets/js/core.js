/* Shared utilities and safe local persistence. */
(() => {
  const read = (key, fallback) => {
    try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
    catch (error) { console.warn(`TechStore: could not read ${key}`, error); return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { console.warn(`TechStore: could not save ${key}`, error); toast('Storage is full or unavailable in this browser.', 'error'); return false; }
  };
  const escapeHTML = window.TechStoreProducts.escapeHTML;
  let toastTimer;
  function toast(message, type = 'success') {
    let host = document.getElementById('toastHost');
    if (!host) { host = document.createElement('div'); host.id = 'toastHost'; host.className = 'toast-host'; host.setAttribute('aria-live', 'polite'); host.setAttribute('aria-atomic', 'true'); document.body.append(host); }
    const node = document.createElement('div'); node.className = `toast toast-${type}`; node.textContent = message; host.append(node);
    requestAnimationFrame(() => node.classList.add('is-visible'));
    window.setTimeout(() => { node.classList.remove('is-visible'); window.setTimeout(() => node.remove(), 250); }, 3200);
  }
  function emitUpdate() { window.dispatchEvent(new CustomEvent('techstore:update')); }
  window.TechStore = { read, write, escapeHTML, toast, emitUpdate };
})();
