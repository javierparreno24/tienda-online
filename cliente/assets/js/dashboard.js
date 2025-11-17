function getTiendaData() {
    const dataString = localStorage.getItem('tiendaData');
    if (dataString) {
        return JSON.parse(dataString);
    }
    return null;
}

function checkAuthentication() {
    [span_0](start_span)[span_1](start_span)[span_2](start_span)// Requisito: Verificar que el usuario esté autenticado usando el token almacenado[span_0](end_span)[span_1](end_span)[span_2](end_span).
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
    [span_3](start_span)// Filtramos los productos destacados[span_3](end_span)
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
        [span_4](start_span)// Requisito: Eliminar todos los datos del localstorage al cerrar sesión[span_4](end_span).
        localStorage.removeItem('authToken'); [span_5](start_span)// Token[span_5](end_span)
        localStorage.removeItem('tiendaData'); [span_6](start_span)// JSON Productos y Categorías[span_6](end_span)
        localStorage.removeItem('carrito'); [span_7](start_span)// Carrito de compras[span_7](end_span)
        localStorage.removeItem('productosVistos'); [span_8](start_span)// JSON Productos recientes vistos[span_8](end_span)
        
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

    [span_9](start_span)[span_10](start_span)[span_11](start_span)// 3. Cargar datos desde LocalStorage[span_9](end_span)[span_10](end_span)[span_11](end_span)
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

// Iniciar el dashboard
initDashboard();

