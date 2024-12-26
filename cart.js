let ApiUrl = "http://localhost:3000"; 

async function loadCartItems() {
        let response = await fetch(`${ApiUrl}/Cart`);
        let cart = await response.json();
        let cartContain = document.querySelector('#cart-items');

        if (cart.length === 0) {
            cartContain.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        let cartHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Rs.${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        cartContain.innerHTML = cartHTML;
}

async function removeFromCart(productId) {
        let response = await fetch(`${ApiUrl}/Cart/${productId}`, {
            method: "DELETE"
        });

        alert("Item removed!");
        loadCartItems();
        updateCount();
}

async function clearCart() {
        let response = await fetch(`${ApiUrl}/Cart`);
        let cart = await response.json();
        await Promise.all(cart.map(item => 
            fetch(`${ApiUrl}/Cart/${item.id}`,
            { method: "DELETE" })
        ));

        alert("Cart cleared.");
        loadCartItems();
        updateCount();
}


async function calculateTotal() {

        let response = await fetch(`${ApiUrl}/Cart`);
        let cart = await response.json();
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
        }


        localStorage.setItem("totalAmount", total.toFixed(2)); 
        window.location.href = "chekout.html";
}

async function updateCount() {
        let response = await fetch(`${ApiUrl}/Cart`);
        let cart = await response.json();
        let cartCount = document.querySelector('#cart-count');
        cartCount.innerHTML = cart.length;
}

function goToMainPage() {
    window.location.href = 'index.html';
}

window.onload = () => {
    loadCartItems();
    updateCount();
};
