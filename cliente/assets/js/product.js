// assets/js/product.js - Lógica de Ficha de Producto y Productos Vistos

const DETAIL_AREA = document.getElementById('product-detail-area');
const RECENTLY_VIEWED_CONTAINER = document.getElementById('recently-viewed');

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function loadProductDetail() {
    const productId = getProductIdFromUrl();
    DETAIL_AREA.innerHTML = ''; 

    if (isNaN(productId)) {
        DETAIL_AREA.innerHTML = '<p class="status-message" style="color:red;">Error: ID de producto no válido.</p>';
        return;
    }

    const product = getProductById(productId); // De storage.js

    if (!product) {
        DETAIL_AREA.innerHTML = `<p class="status-message" style="color:red;">Error: Producto con ID ${productId} no encontrado.</p>`;
        return;
    }

    document.getElementById('product-title').textContent = product.nombre;

    // Inyectar HTML de los detalles
    DETAIL_AREA.innerHTML = `
        <div class="product-detail-container">
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="product-info-detail">
                <h1>${product.nombre}</h1>
                <p class="description">${product.descripcion}</p>
                <p class="price">${product.precio.toFixed(2)}€</p>
                
                <button class="btn btn-success" onclick="addToCart(${product.id})">
                     Añadir al Carrito
                </button>
            </div>
        </div>
    `;

    // REQUISITO CLAVE: Almacenar el producto como visto recientemente
    addVisto(product); // De storage.js
    
    displayRecentlyViewed();
}

function displayRecentlyViewed() {
    const currentId = getProductIdFromUrl();
    let vistos = getVistos(); // De storage.js
    
    // Excluir el producto actual
    vistos = vistos.filter(p => p.id !== currentId); 

    if (vistos.length === 0) {
        RECENTLY_VIEWED_CONTAINER.innerHTML = '<p>Aún no has visto otros productos.</p>';
        return;
    }

    RECENTLY_VIEWED_CONTAINER.innerHTML = '';

    vistos.forEach(visto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${visto.imagen}" alt="${visto.nombre}">
            <div class="product-info">
                <h3>${visto.nombre}</h3>
                <a href="product.html?id=${visto.id}" class="btn">Ver Detalle</a>
            </div>
        `;
        RECENTLY_VIEWED_CONTAINER.appendChild(card);
    });
}

window.addEventListener('load', loadProductDetail);

