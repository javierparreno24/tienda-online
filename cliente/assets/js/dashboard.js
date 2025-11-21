function getTiendaData() {
    const dataString = localStorage.getItem('tiendaData');
    if (dataString) {
        return JSON.parse(dataString);
    }
    return null;
}

function checkAuthentication() {
    // Requisito: Verificar que el usuario esté autenticado usando el token almacenado.
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Si no hay token, redirigir al login
        alert('Sesión caducada o no iniciada. Por favor, inicie sesión.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function displayFeaturedProducts(tiendaData) {
    const container = document.getElementById('featured-products');
    // Filtramos los productos destacados
    const featured = tiendaData.productos.filter(p => p.destacado === true);

    if (featured.length === 0) {
        container.innerHTML = '<p>No hay productos destacados en este momento.</p>';
        return;
    }

    featured.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p><strong>Precio:</strong> ${product.precio.toFixed(2)}€</p>
            <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
            <a href="product.html?id=${product.id}">Ver Ficha</a>
        `;
        container.appendChild(card);
    });
}

function setupLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        // Requisito: Eliminar todos los datos del localstorage al cerrar sesión.
        localStorage.removeItem('authToken'); // Token
        localStorage.removeItem('tiendaData'); // JSON Productos y Categorías
        localStorage.removeItem('carrito'); // Carrito de compras
        localStorage.removeItem('productosVistos'); // JSON Productos recientes vistos
        
        alert('Sesión cerrada. Serás redirigido al login.');
        window.location.href = 'login.html';
    });
}

function initDashboard() {
    const loadingStatus = document.getElementById('loading-status');
    const mainContent = document.getElementById('main-content');
    
    // 2. Seguridad: Verificar Token
    if (!checkAuthentication()) {
        return; // Detiene la ejecución si no está autenticado
    }

    // 3. Cargar datos desde LocalStorage
    const tiendaData = getTiendaData();

    if (!tiendaData) {
        loadingStatus.textContent = 'Error: No se encontraron datos de la tienda en LocalStorage. Intente iniciar sesión de nuevo.';
        loadingStatus.style.color = 'red';
        return;
    }

    loadingStatus.style.display = 'none';
    mainContent.style.display = 'block';

    // 4. Mostrar Productos Destacados
    displayFeaturedProducts(tiendaData);
    
    // 5. Inicializar el botón de Cierre de Sesión
    setupLogout();
}

function addToCart(productId) {
    // Obtener carrito actual
    let carrito = localStorage.getItem('carrito');
    carrito = carrito ? JSON.parse(carrito) : [];
    
    // Verificar si el producto ya está en el carrito
    const existingProduct = carrito.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        carrito.push({ id: productId, cantidad: 1 });
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    alert('Producto añadido al carrito');
}
// Iniciar el dashboard
initDashboard();

