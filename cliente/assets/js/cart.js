// assets/js/cart.js - Lógica de Carrito y Validación de Compra

const CART_CONTENT_DIV = document.getElementById('cart-content');
const CART_TOTAL_SPAN = document.getElementById('cart-total-display');
const CHECKOUT_BTN = document.getElementById('checkout-btn');
const CLEAR_BTN = document.getElementById('clear-btn');
const CHECKOUT_MESSAGE = document.getElementById('checkout-message');

// CAMBIA ESTA URL a la de tu servidor local
const CARRITO_API_URL = 'http://localhost/server/carrito.php'; 

function renderCart() {
    const cart = getCart(); // De storage.js
    document.getElementById('cart-actions').style.display = cart.length > 0 ? 'block' : 'none';

    if (cart.length === 0) {
        CART_CONTENT_DIV.innerHTML = '<p class="status-message">Tu carrito está vacío.</p>';
        CART_TOTAL_SPAN.textContent = '0.00€';
        return;
    }

    let total = 0;
    
    const tableHtml = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => {
                    const subtotal = item.precio * item.quantity;
                    total += subtotal;
                    return `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>${item.precio.toFixed(2)}€</td>
                            <td>
                                <input type="number" 
                                       min="1" 
                                       value="${item.quantity}" 
                                       onchange="updateQuantity(${item.id}, this.value)">
                            </td>
                            <td>${subtotal.toFixed(2)}€</td>
                            <td>
                                <button class="btn btn-danger" onclick="removeItem(${item.id})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;

    CART_CONTENT_DIV.innerHTML = tableHtml;
    CART_TOTAL_SPAN.textContent = total.toFixed(2) + '€';
}

function updateQuantity(id, newQuantity) {
    let cart = getCart();
    const quantity = parseInt(newQuantity);

    if (quantity <= 0 || isNaN(quantity)) {
        removeItem(id);
        return;
    }

    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        saveCart(cart); 
        renderCart(); 
    }
}

function removeItem(id) {
    let cart = getCart();
    const newCart = cart.filter(item => item.id !== id);
    saveCart(newCart);
    renderCart();
}

async function checkout() {
    const token = localStorage.getItem('authToken');
    const cart = getCart();

    CHECKOUT_MESSAGE.textContent = 'Validando precios en el servidor...';
    CHECKOUT_MESSAGE.style.color = 'blue';
    CHECKOUT_BTN.disabled = true;

    try {
        const response = await fetch(CARRITO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // REQUISITO DE SEGURIDAD: Enviar el token para la validación
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ carrito: cart })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            CHECKOUT_MESSAGE.textContent = `Compra finalizada. Total validado: ${data.total_validado}€`;
            CHECKOUT_MESSAGE.style.color = 'green';
            clearCart(); // Vaciar carrito local
        } else {
            // Error, incluyendo la detección de manipulación (código 403)
            CHECKOUT_MESSAGE.textContent = ` Error: ${data.error || 'No se pudo completar la validación.'}`;
            CHECKOUT_MESSAGE.style.color = 'red';
        }
    } catch (error) {
        CHECKOUT_MESSAGE.textContent = 'Error de conexión con el servidor.';
        CHECKOUT_MESSAGE.style.color = 'red';
    } finally {
        CHECKOUT_BTN.disabled = false;
        renderCart(); 
    }
}

// Eventos y carga inicial
CHECKOUT_BTN.addEventListener('click', checkout);
CLEAR_BTN.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        clearCart();
        renderCart();
    }
});
window.addEventListener('load', renderCart);
