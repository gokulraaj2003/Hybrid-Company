// cart.js
let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-button');

    const addToCartButtons = document.querySelectorAll('.btn.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = parseFloat(productCard.querySelector('.price').innerText.replace('$', ''));
            const productImg = productCard.querySelector('.product-img img').src;
            addToCart(productName, productPrice, productImg);
            showAddedToCartMessage(productName);
            cartDropdown.classList.add('show');
            setTimeout(() => cartDropdown.classList.remove('show'), 3000);
        });
    });

    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#cart-icon') && !e.target.closest('#cart-dropdown')) {
            cartDropdown.classList.remove('show');
        }
    });

    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length > 0) {
            alert("Checkout simulated. Cart data would be sent to a server in real implementation."); //Simulated checkout
        } else {
            alert('Your cart is empty. Add some products before checkout.');
        }
    });

    function addToCart(name, price, imgSrc) {
        const existingItemIndex = cart.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name: name, price: price, imgSrc: imgSrc, quantity: 1 });
        }
        updateCartUI();
        updateCartTotal();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
        updateCartTotal();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-img"><img src="${item.imgSrc}" alt="${item.name}" ></div>
                <div class="cart-item-details"><h4>${item.name}</h4><p>$${item.price.toFixed(2)} x ${item.quantity}</p><p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p></div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    function updateCartTotal() {
        cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cart-count').innerText = cart.reduce((count, item) => count + item.quantity, 0);
        cartTotalElement.innerText = `$${cartTotal.toFixed(2)}`;
    }

    function showAddedToCartMessage(productName) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('added-to-cart-message');
        messageElement.innerHTML = `<p>"${productName}" added to cart</p>`;
        document.body.appendChild(messageElement);
        setTimeout(() => messageElement.classList.add('show'), 10);
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => document.body.removeChild(messageElement), 300);
        }, 3000);
    }
});