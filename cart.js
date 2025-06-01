
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); }
function addToCart(name, price) { const cart = getCart(); cart.push({ name, price }); saveCart(cart); alert(name + ' added to cart!'); }
function updateCartCount() { const count = getCart().length; document.querySelectorAll('#cart-count').forEach(el => el.textContent = count); }
function displayCart() { const cart = getCart(); const cartItems = document.getElementById('cart-items'); const cartTotal = document.getElementById('cart-total');
cartItems.innerHTML = ''; let total = 0;
cart.forEach(item => { cartItems.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`; total += item.price; });
cartTotal.textContent = 'Total: $' + total.toFixed(2); }
function checkout() { alert('This is a mock checkout! Thank you for shopping.'); localStorage.removeItem('cart'); updateCartCount(); displayCart(); }
document.addEventListener('DOMContentLoaded', () => { updateCartCount(); if (document.getElementById('cart-items')) displayCart(); });
