// Sample Products Data (Aap isme aur products add kar sakte hain)
// Updated Products Data with Live Image URLs
const products = [
    { 
        id: 1, 
        title: "Premium Whey Protein (1kg)", 
        price: 3499, 
        image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&q=80" 
    },
    { 
        id: 2, 
        title: "Creatine Monohydrate (250g)", 
        price: 899, 
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80" 
    },
    { 
        id: 3, 
        title: "High Protein Peanut Butter", 
        price: 449, 
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&q=80" 
    },
    { 
        id: 4, 
        title: "Advanced Mass Gainer (3kg)", 
        price: 2799, 
        image: "https://images.unsplash.com/photo-1546483875-5f01450a876a?w=500&q=80" 
    },
    { 
        id: 5, 
        title: "Pre-Workout Energy Drink", 
        price: 1249, 
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80" 
    },
    { 
        id: 6, 
        title: "Gym Shaker Bottle", 
        price: 299, 
        image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=500&q=80" 
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');

// 1. Render Products Dinamically
function displayProducts(productsList) {
    productsGrid.innerHTML = "";
    if(productsList.length === 0) {
        productsGrid.innerHTML = "<p>No products found.</p>";
        return;
    }
    
    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-price">₹${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 2. Add Item to Cart
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

// 3. Update Cart UI & Count
function updateCart() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.innerText = totalItems;

    // Update Modal Items
    cartItemsContainer.innerHTML = "";
    let totalScore = 0;

    cart.forEach(item => {
        totalScore += item.price * item.quantity;
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    totalPriceEl.innerText = totalScore;
}

// 4. Remove Item from Cart
window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// 5. Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// 6. Modal Open/Close Events
cartBtn.addEventListener('click', () => cartModal.style.display = 'flex');
closeCart.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// Initial Load
displayProducts(products);