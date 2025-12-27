/**
 * Modern OOP E-Commerce Script
 */

// --- 1. Product & Item Classes ---

// Base Class: Represents a generic product
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    renderProductCard() {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="image-wrapper">
                <img src="${this.image}" alt="${this.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${this.name}</h3>
                <span class="price">$${this.price.toFixed(2)}</span>
                <button onclick="cartManager.addToCart(${this.id})" class="btn primary-btn">Add to Cart</button>
            </div>
        `;
        return div;
    }
}

// Subclass: Represents an item specifically inside the cart
class CartItem extends Product {
    constructor(product, quantity = 1) {
        super(product.id, product.name, product.price, product.image); 
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    renderCartRow() {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <span class="item-name">${this.name}</span>
                <span class="item-qty">Qty: ${this.quantity}</span>
            </div>
            <span class="item-total">$${this.getTotalPrice().toFixed(2)}</span>
        `;
        return div;
    }
}

// --- 2. Cart Manager Logic ---

class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('modernCart')) || [];
        
        // Product Data (with Unsplash Images)
        this.availableProducts = [
            new Product(1, 'Wireless Headphones', 199.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'),
            new Product(2, 'Mechanical Keyboard', 145.00, 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=80'),
            new Product(3, '4K Ultra Monitor', 350.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80'),
            new Product(4, 'Smart Speaker', 89.00, 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&q=80'),
            new Product(5, 'Minimalist Lamp', 45.00, 'https://imgs.search.brave.com/dKAS1doDt11W89oRxL_kqgEHp2IVadjB3442qgFkN9U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjE1R21OMHFqNEwu/anBn'),
            new Product(6, 'Pro Earbuds', 120.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80')
        ];
        
        this.init();
    }

    init() {
        this.renderStore();
        this.renderCart();
        this.updateTotal();
    }

    renderStore() {
        const grid = document.getElementById('product-list');
        grid.innerHTML = ''; 
        this.availableProducts.forEach(prod => {
            grid.appendChild(prod.renderProductCard());
        });
    }

    addToCart(productId) {
        const product = this.availableProducts.find(p => p.id === productId);
        const existingItemIndex = this.cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            this.cart[existingItemIndex].quantity += 1;
        } else {
            const newItem = new CartItem(product); 
            this.cart.push(newItem);
        }

        // Visual Feedback
        const btn = document.querySelector(`button[onclick="cartManager.addToCart(${productId})"]`);
        if(btn) {
            const originalText = btn.innerText;
            btn.innerText = "Added! ✓";
            btn.style.backgroundColor = "#10B981"; // Green
            setTimeout(() => {
                 btn.innerText = originalText;
                 btn.style.backgroundColor = "";
            }, 800);
        }

        this.saveCart();
        this.renderCart();
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';

        if (this.cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
            this.updateTotal();
            return;
        }

        this.cart.forEach(itemData => {
            const productRef = new Product(itemData.id, itemData.name, itemData.price, itemData.image);
            const cartItem = new CartItem(productRef, itemData.quantity);
            cartContainer.appendChild(cartItem.renderCartRow());
        });

        this.updateTotal();
    }

    updateTotal() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('total-price').innerText = total.toFixed(2);
    }

    saveCart() {
        localStorage.setItem('modernCart', JSON.stringify(this.cart));
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.renderCart();
    }
}

// --- 3. Theme Logic ---

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('modernTheme');

// Initialize Theme
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleBtn.innerText = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('modernTheme', 'light');
        themeToggleBtn.innerText = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('modernTheme', 'dark');
        themeToggleBtn.innerText = '☀️ Light Mode';
    }
});

// --- 4. Initialize App ---
const cartManager = new CartManager();

document.getElementById('clear-cart').addEventListener('click', () => {
    cartManager.clearCart();
});