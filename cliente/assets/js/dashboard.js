
function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Sesión caducada o no iniciada. Por favor, inicie sesión.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn') || document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken'); 
            localStorage.removeItem('tiendaData'); 
            localStorage.removeItem('carrito'); 
            localStorage.removeItem('productosVistos'); 
            
            alert('Sesión cerrada. Serás redirigido al login.');
            window.location.href = 'login.html';
        });
    }
}

function displayFeaturedProducts(tiendaData) {
    const container = document.getElementById('featured-products');
    
    // 1. Filtrar productos destacados
    const featured = tiendaData.productos.filter(p => p.destacado === true);

    if (featured.length === 0) {
        container.innerHTML = '<p>No hay productos destacados en este momento.</p>';
        return;
    }

    // 2. Limpiar e inyectar productos
    container.innerHTML = '';
    
    featured.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p><strong>Precio:</strong> ${product.precio.toFixed(2)}€</p>
                <button class="btn btn-success" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                <a href="product.html?id=${product.id}" class="btn">Ver Detalle</a>
            </div>
        `;
        container.appendChild(card);
    });
}
// --- FUNCIÓN ESPECÍFICA DEL DASHBOARD ---
function initDashboard() {
    const loadingStatus = document.getElementById('loading-status');
    const mainContent = document.getElementById('main-content');
    
    // Esta verificación no debería ser necesaria con el nuevo Listener, pero la mantenemos por seguridad
    if (!loadingStatus || !mainContent) {
        console.error("Error grave: initDashboard se llamó en una página sin sus elementos.");
        return; 
    }

    const tiendaData = getTiendaData(); // Llama a la función que ahora está en storage.js

    if (!tiendaData) {
        loadingStatus.textContent = 'Error: No se encontraron datos de la tienda en LocalStorage.';
        loadingStatus.style.color = 'red';
        return;
    }

    loadingStatus.style.display = 'none';
    mainContent.style.display = 'block';

    displayFeaturedProducts(tiendaData);
}

// --- LÓGICA DE EJECUCIÓN CONDICIONAL (SOLUCIÓN AL ERROR) ---

window.addEventListener('load', () => {
    // 1. Seguridad Universal: Ejecutar la autenticación y logout setup en todas las páginas (excepto login)
    if (window.location.pathname.indexOf('login.html') === -1) {
        // Esta línea redirige si no hay token
        if (checkAuthentication()) {
            setupLogout(); // Solo inicializa el logout si el usuario está logeado
        }
    }

    // 2. Lógica Específica: Ejecutar initDashboard() solo si estamos en dashboard.html
    const isDashboardPage = window.location.pathname.endsWith('dashboard.html') || 
                            window.location.pathname.endsWith('/dashboard/'); // Para cubrir URLs con y sin barra

    if (isDashboardPage) {
        // La función initDashboard se ejecuta AHORA.
        initDashboard();
    }
});
