const CART_KEY = 'carrito';
const TIENDA_KEY = 'tiendaData';

// FUNCIÓN FALTANTE: Obtener el carrito
function getCart() {
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProductbyId(productId) {
    const tiendaData = JSON.parse(localStorage.getItem(TIENDA_KEY));
    if (tiendaData && tiendaData.productos) { // Cambiar || por &&
        return tiendaData.productos.find(p => p.id === productId); // Cambiar id por productId
    }
    return null;
}

function addToCart(productId) {
    const productToAdd = getProductbyId(productId);
    if (!productToAdd) {
        alert('Producto no encontrado');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        existingItem.quantity += 1; // Cambiar 'cantidad' por 'quantity' para ser consistente
    } else {
        cart.push({ 
            id: productToAdd.id, 
            nombre: productToAdd.nombre,
            precio: productToAdd.precio, 
            quantity: 1 
        });
    }

    saveCart(cart);
    updateCartCount(getCart().reduce((total, item) => total + item.quantity, 0));
    alert(`Producto "${productToAdd.nombre}" añadido al carrito.`);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount(0);
}

function updateCartCount(count) {
    console.log(`Carrito actualizado. Total items: ${count}`);
    // Aquí puedes actualizar un badge en el header si lo tienes
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = count;
    }
}

// Inicializar el contador del carrito al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    updateCartCount(getCart().reduce((total, item) => total + item.quantity, 0));
});