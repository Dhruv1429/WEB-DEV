// 1. Base Class (Parent)
class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    // Method to generate HTML
    render() {
        return `
            <div class="product-card">
                <h3>${this.name}</h3>
                <p>${this.description}</p>
                <p class="price">$${this.price.toFixed(2)}</p>
                ${this.getSpecificDetails()}
                <button onclick="alert('Added ${this.name} to cart!')">Buy Now</button>
            </div>
        `;
    }

    // Placeholder method to be overridden by children
    getSpecificDetails() {
        return '';
    }
}

// 2. Child Class: Electronics (Inheritance)
class Electronics extends Product {
    constructor(name, price, description, warrantyPeriod) {
        super(name, price, description); // Call parent constructor
        this.warrantyPeriod = warrantyPeriod;
    }

    // Polymorphism: Overriding the specific details method
    getSpecificDetails() {
        return `<p class="badge">⚡ Warranty: ${this.warrantyPeriod}</p>`;
    }
}

// 3. Child Class: Clothing (Inheritance)
class Clothing extends Product {
    constructor(name, price, description, size, material) {
        super(name, price, description);
        this.size = size;
        this.material = material;
    }

    getSpecificDetails() {
        return `<p class="badge">👕 Size: ${this.size} | ${this.material}</p>`;
    }
}

// 4. Instantiation & Rendering
const products = [
    new Electronics("Smartphone X", 999, "Latest generation smartphone.", "2 Years"),
    new Clothing("Summer Tee", 29.99, "Breathable cotton t-shirt.", "L", "100% Cotton"),
    new Electronics("Noise-Cancel Headphones", 199, "Immersive sound experience.", "1 Year"),
    new Clothing("Denim Jacket", 59.99, "Classic blue denim.", "M", "Denim")
];

const container = document.getElementById('product-list');

// Loop through objects and render
products.forEach(product => {
    container.innerHTML += product.render();
});

// 5. Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
});