const CART_KEY = 'carrito';
const TIENDA_KEY = 'tiendaData';

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProductbyId(productId) {
    const tiendaData = JSON.parse(localStorage.getItem(TIENDA_KEY));
    if (tiendaData || tiendaData.productos) {
        return tiendaData.productos.find(p => p.id === id) 
    }
}

function addToCart(productId) {
    const productToAdd = getProductbyId(productId);
    if (!productToAdd) {
        alert('Producto no encontrado');
        return;
    }

    const cart=getCart();
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) { // Si el producto ya está en el carrito, aumentamos la cantidad
        existingItem.cantidad += 1;
    } else {
        cart.push({ id: productToAdd.id, nombre:productToAdd.nombre ,precio:productToAdd.precio , quantity: 1 });
    }

    saveCart(cart);
    alert(`Producto "${productToAdd.nombre}" añadido al carrito.`);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount(0);
}

function updateCartCount(count) {
    console.log(`Carrito actualizado. Total items: ${count}`);
}

//Inicializar el contador del carrito al cargar la página
window.onload = () => {
    updateCartCount(getCart().reduce((total, item) => total + item.quantity, 0));
};