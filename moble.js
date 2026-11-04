// ===== Product Data =====
const products = [
    {
        id: 1, brand: "Apple", name: "iPhone 15 Pro Max",
        specs: "256GB • Titanium • A17 Pro", price: 389999, oldPrice: 419999,
        type: "iphone", tier: "flagship",
        img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80"
    },
    {
        id: 2, brand: "Apple", name: "iPhone 15",
        specs: "128GB • Dynamic Island • A16", price: 269999, oldPrice: 289999,
        type: "iphone", tier: "flagship",
        img: "https://images.unsplash.com/photo-1696429175928-7c3f0e6a9b9a?w=500&q=80"
    },
    {
        id: 3, brand: "Apple", name: "iPhone 13",
        specs: "128GB • A15 Bionic • 5G", price: 189999, oldPrice: 219999,
        type: "iphone", tier: "budget",
        img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80"
    },
    {
        id: 4, brand: "Samsung", name: "Galaxy S24 Ultra",
        specs: "512GB • S Pen • 200MP Camera", price: 349999, oldPrice: 369999,
        type: "android", tier: "flagship",
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80"
    },
    {
        id: 5, brand: "Samsung", name: "Galaxy A54",
        specs: "256GB • 6.4\" AMOLED • 5000mAh", price: 94999, oldPrice: 109999,
        type: "android", tier: "budget",
        img: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=500&q=80"
    },
    {
        id: 6, brand: "Xiaomi", name: "Redmi Note 13 Pro",
        specs: "256GB • 200MP Camera • 67W", price: 69999, oldPrice: 79999,
        type: "android", tier: "budget",
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80"
    },
    {
        id: 7, brand: "Xiaomi", name: "Xiaomi 14 Ultra",
        specs: "512GB • Leica Camera • Snapdragon 8", price: 249999, oldPrice: 269999,
        type: "android", tier: "flagship",
        img: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&q=80"
    },
    {
        id: 8, brand: "OnePlus", name: "OnePlus 12",
        specs: "256GB • 100W Charging • AMOLED", price: 179999, oldPrice: 199999,
        type: "android", tier: "flagship",
        img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80"
    },
    {
        id: 9, brand: "Oppo", name: "Oppo Reno 11",
        specs: "256GB • 6.7\" AMOLED • 67W", price: 84999, oldPrice: 94999,
        type: "android", tier: "budget",
        img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80"
    },
    {
        id: 10, brand: "Vivo", name: "Vivo V30 Pro",
        specs: "256GB • Zeiss Camera • 80W", price: 129999, oldPrice: 139999,
        type: "android", tier: "flagship",
        img: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&q=80"
    },
    {
        id: 11, brand: "Infinix", name: "Infinix Note 40",
        specs: "128GB • 6.78\" AMOLED • 45W", price: 44999, oldPrice: 49999,
        type: "android", tier: "budget",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
    },
    {
        id: 12, brand: "Realme", name: "Realme 12 Pro+",
        specs: "256GB • Periscope Camera • 67W", price: 79999, oldPrice: 89999,
        type: "android", tier: "budget",
        img: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=500&q=80"
    }
];

let cart = [];

// ===== Render Products =====
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    const filtered = products.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'android' || filter === 'iphone') return p.type === filter;
        return p.tier === filter;
    });

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const badgeClass = p.type === 'iphone' ? 'badge-iphone' : 'badge-android';
        const badgeText = p.type === 'iphone' ? 'iPhone' : 'Android';
        const discount = Math.round((1 - p.price / p.oldPrice) * 100);

        card.innerHTML = `
            <div class="product-img">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(p.brand)}'">
                <span class="product-badge ${badgeClass}">${badgeText}</span>
                ${discount > 0 ? `<span class="product-badge badge-sale" style="left:auto;right:15px">-${discount}%</span>` : ''}
            </div>
            <div class="product-body">
                <span class="product-brand">${p.brand}</span>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-specs">${p.specs}</p>
                <div class="product-price">Rs. ${p.price.toLocaleString()} <small>Rs. ${p.oldPrice.toLocaleString()}</small></div>
                <button class="add-btn" onclick="addToCart(${p.id}, this)">Add to Cart 🛒</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== Filter Buttons =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// ===== Cart Functions =====
function addToCart(id, btn) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    if (btn) {
        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = 'Add to Cart 🛒';
            btn.classList.remove('added');
        }, 1500);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = total.toLocaleString();

    const itemsDiv = document.getElementById('cartItems');
    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty 🛒</p>';
        return;
    }

    itemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name} ${item.qty > 1 ? `(x${item.qty})` : ''}</h4>
                <p>Rs. ${(item.price * item.qty).toLocaleString()}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some products first.');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    alert(`✅ Order Confirmed!\n\nTotal: Rs. ${total.toLocaleString()}\n\nThank you for shopping at TechZone Mobiles!\nOur team will contact you shortly.`);
    cart = [];
    updateCart();
    toggleCart();
}

// ===== Contact Form =====
function sendMessage(e) {
    e.preventDefault();
    alert('✅ Thank you for your message! We will contact you soon.');
    e.target.reset();
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.get