let ApiUrl = "http://localhost:3000"; // JSON Server URL

async function loadProducts() {
        let response = await fetch(`${ApiUrl}/ProductsData`);
        let products = await response.json();
        let productsContainer = document.querySelector('#products');

        let productsHTML = products.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rs.${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('');
        productsContainer.innerHTML = productsHTML;

    
}

// Add to cart;
async function addToCart(productId) {
        let pResponse = await fetch(`${ApiUrl}/ProductsData/${productId}`);
        let product = await pResponse.json();

        let cResponse = await fetch(`${ApiUrl}/Cart`);
        let cart = await cResponse.json();

        let proIndex = -1;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                proIndex = i;
                break;
            }
        }
            await fetch(`${ApiUrl}/Cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                })
            });

        updateCartCount();
}




async function updateCartCount() {
        let response = await fetch(`${ApiUrl}/Cart`);
        let cart = await response.json();
        let cartCount = document.querySelector('#cart-count');
        cartCount.innerHTML = cart.length;
}

function goToMainPage() {
    window.location.href = 'index.html';
}

function goToCartPage() {
    window.location.href = 'cart.html';  
}

window.onload = () => {
    loadProducts(); 
    updateCartCount(); 
};


