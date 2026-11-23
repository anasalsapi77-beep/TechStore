/* TechStore catalogue — demo data, editable in one place. */
(() => {
  const products = [
  {
    "id": 1,
    "name": "Apex Gaming Laptop",
    "category": "Laptops",
    "price": 1299,
    "oldPrice": 1499,
    "rating": 4.9,
    "reviews": 128,
    "badge": "BEST SELLER",
    "image": "laptop.svg",
    "featured": true,
    "stock": 8,
    "description": "A precision-built performance machine for creators and competitive players. A vivid high-refresh display meets next-generation processing power in a refined aluminium chassis.",
    "specs": [
      "16-inch QHD 240Hz display",
      "Next-gen 12-core processor",
      "32GB DDR5 memory",
      "1TB NVMe SSD",
      "Dedicated RTX-class graphics"
    ]
  },
  {
    "id": 2,
    "name": "Nova X Smartphone",
    "category": "Smartphones",
    "price": 899,
    "oldPrice": 999,
    "rating": 4.8,
    "reviews": 96,
    "badge": "NEW ARRIVAL",
    "image": "phone.svg",
    "featured": true,
    "stock": 14,
    "description": "A brilliant edge-to-edge display, pro-grade camera system and all-day battery life, engineered for every moment.",
    "specs": [
      "6.7-inch AMOLED display",
      "120Hz adaptive refresh rate",
      "Triple 50MP camera system",
      "512GB storage",
      "All-day battery with fast charging"
    ]
  },
  {
    "id": 3,
    "name": "Studio Wireless Headphones",
    "category": "Accessories",
    "price": 199,
    "oldPrice": 249,
    "rating": 4.7,
    "reviews": 214,
    "badge": "POPULAR",
    "image": "headphones.svg",
    "featured": true,
    "stock": 22,
    "description": "Lose yourself in rich, balanced sound. Adaptive noise cancellation and a lightweight fit make every listening session feel effortless.",
    "specs": [
      "Adaptive active noise cancellation",
      "Hi-res wireless audio",
      "Up to 40 hours battery",
      "Multipoint Bluetooth",
      "Memory-foam ear cushions"
    ]
  },
  {
    "id": 4,
    "name": "Chrono Smartwatch Pro",
    "category": "Accessories",
    "price": 299,
    "oldPrice": 349,
    "rating": 4.8,
    "reviews": 83,
    "badge": "LIMITED",
    "image": "watch.svg",
    "featured": false,
    "stock": 11,
    "description": "A considered blend of wellness intelligence and modern design, with a bright always-on display and tools that keep your day in rhythm.",
    "specs": [
      "1.9-inch always-on AMOLED",
      "Advanced health tracking",
      "GPS and water resistance",
      "Up to 10 days battery",
      "Quick-release premium strap"
    ]
  },
  {
    "id": 5,
    "name": "Phantom Mechanical Keyboard",
    "category": "Gaming",
    "price": 149,
    "oldPrice": 179,
    "rating": 4.9,
    "reviews": 167,
    "badge": "TOP RATED",
    "image": "keyboard.svg",
    "featured": true,
    "stock": 19,
    "description": "A satisfying, precise typing experience with hot-swappable mechanical switches, programmable lighting and a durable compact frame.",
    "specs": [
      "Hot-swappable tactile switches",
      "Per-key RGB lighting",
      "Aluminium top plate",
      "USB-C detachable cable",
      "Compact 75% layout"
    ]
  },
  {
    "id": 6,
    "name": "Vector Precision Mouse",
    "category": "Gaming",
    "price": 79,
    "oldPrice": 99,
    "rating": 4.6,
    "reviews": 142,
    "badge": "",
    "image": "mouse.svg",
    "featured": false,
    "stock": 31,
    "description": "Ultra-responsive tracking and a balanced ergonomic shape deliver confident control from long creative sessions to intense matches.",
    "specs": [
      "26K DPI optical sensor",
      "Wireless 2.4GHz + Bluetooth",
      "Up to 90 hours battery",
      "6 programmable buttons",
      "Lightweight 68g shell"
    ]
  },
  {
    "id": 7,
    "name": "Vision Ultra Tablet",
    "category": "Smartphones",
    "price": 649,
    "oldPrice": 729,
    "rating": 4.7,
    "reviews": 74,
    "badge": "NEW ARRIVAL",
    "image": "tablet.svg",
    "featured": true,
    "stock": 9,
    "description": "A spacious canvas for ideas, entertainment and work. The high-resolution display and powerful chipset make multitasking feel natural.",
    "specs": [
      "12.4-inch 2.8K display",
      "120Hz refresh rate",
      "8GB RAM / 256GB storage",
      "Precision stylus support",
      "Quad-speaker audio"
    ]
  },
  {
    "id": 8,
    "name": "Pulse Bluetooth Speaker",
    "category": "Accessories",
    "price": 119,
    "oldPrice": 139,
    "rating": 4.5,
    "reviews": 109,
    "badge": "",
    "image": "speaker.svg",
    "featured": false,
    "stock": 27,
    "description": "Room-filling sound in a portable, weather-ready design. Pair two speakers for a wider stereo experience wherever you go.",
    "specs": [
      "360-degree immersive audio",
      "IP67 water resistance",
      "Up to 18 hours playback",
      "USB-C fast charging",
      "Stereo pairing support"
    ]
  },
  {
    "id": 9,
    "name": "Lumix Creator Camera",
    "category": "Accessories",
    "price": 899,
    "oldPrice": 1049,
    "rating": 4.8,
    "reviews": 61,
    "badge": "CREATOR PICK",
    "image": "camera.svg",
    "featured": false,
    "stock": 6,
    "description": "Capture detail and atmosphere with a versatile creator-focused camera, dependable autofocus and beautifully rendered colour.",
    "specs": [
      "24MP BSI sensor",
      "4K 60fps video",
      "5-axis image stabilisation",
      "Fast hybrid autofocus",
      "Weather-sealed body"
    ]
  },
  {
    "id": 10,
    "name": "Nebula 4K Gaming Monitor",
    "category": "Gaming",
    "price": 499,
    "oldPrice": 599,
    "rating": 4.8,
    "reviews": 92,
    "badge": "GAMER FAVOURITE",
    "image": "monitor.svg",
    "featured": true,
    "stock": 12,
    "description": "Deep contrast, crisp 4K detail and fluid motion make every frame feel immediate. Built for immersive play and sharp everyday work.",
    "specs": [
      "32-inch 4K UHD panel",
      "144Hz refresh rate",
      "HDR600 support",
      "Adaptive sync technology",
      "Height-adjustable stand"
    ]
  }
];
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0);
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function getProductById(id) { return products.find(product => product.id === Number(id)) || null; }
  function productCard(product) {
    if (!product) return '';
    return `<article class="product-card reveal-card">
      <a class="product-art" href="product.html?id=${product.id}" aria-label="View ${escapeHTML(product.name)}">
        ${product.badge ? `<span class="product-badge">${escapeHTML(product.badge)}</span>` : ''}
        <img src="assets/images/products/${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">
      </a>
      <div class="product-info">
        <div class="product-meta"><span>${escapeHTML(product.category)}</span><span class="rating">★ ${product.rating.toFixed(1)} <small>(${product.reviews})</small></span></div>
        <h3><a href="product.html?id=${product.id}">${escapeHTML(product.name)}</a></h3>
        <div class="product-buy-row"><div class="price-stack"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ''}</div><button class="icon-button add-icon" type="button" data-add-to-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart" title="Add to cart">＋</button></div>
        <button class="text-action" type="button" data-add-to-wishlist="${product.id}">♡ Save to wishlist</button>
      </div>
    </article>`;
  }
  window.TechStoreProducts = { products, money, escapeHTML, getProductById, productCard };
  window.products = products;
  window.getProductById = getProductById;
  window.formatPrice = money;
})();
