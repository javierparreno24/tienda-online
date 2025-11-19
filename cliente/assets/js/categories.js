const CATEGORY_GRID_CONTAINER = document.getElementById('category-grid');
const PRODUCTS_CONTAINER = document.getElementById('products-by-category');
const CATEGORY_NAME_SPAN = document.getElementById('category-name');
const PRODUCTS_TITLE = document.getElementById('products-title');

/**
 * Muestra el listado de categorías al cargar la página, extrayéndolas de localStorage.
 */
function displayCategories() {
    // getTiendaData() se asume que está definida en storage.js
    const tiendaData = getTiendaData(); 

    if (!tiendaData || !tiendaData.categorias || tiendaData.categorias.length === 0) {
        CATEGORY_GRID_CONTAINER.innerHTML = '<p>No se encontraron categorías de la tienda en LocalStorage.</p>';
        return;
    }

    CATEGORY_GRID_CONTAINER.innerHTML = ''; // Limpiar cualquier contenido previo

    tiendaData.categorias.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `<h3>${category.nombre}</h3>`;
        
        // Asignar el evento click para filtrar productos
        card.addEventListener('click', () => {
            // Llama a la función para mostrar los productos de esa categoría
            displayProductsByCategory(category.id_categoria, category.nombre);
        });
        CATEGORY_GRID_CONTAINER.appendChild(card);
    });
}

/**
 * Muestra los productos filtrados por una categoría específica.
 * @param {number} categoryId - ID de la categoría a filtrar (debe coincidir con id_categoria del producto).
 * @param {string} categoryName - Nombre de la categoría.
 */
function displayProductsByCategory(categoryId, categoryName) {
    const tiendaData = getTiendaData();
    // Filtramos los productos que coincidan con el id_categoria
    const filteredProducts = tiendaData.productos.filter(p => p.id_categoria === categoryId);

    // 1. Actualizar el título de la sección de productos
    CATEGORY_NAME_SPAN.textContent = categoryName;
    PRODUCTS_TITLE.style.display = 'block';

    // 2. Limpiar e inyectar productos en la cuadrícula
    PRODUCTS_CONTAINER.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        PRODUCTS_CONTAINER.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p>Precio: ${product.precio.toFixed(2)}€</p>
                
                <button class="btn btn-success" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                
                <a href="product.html?id=${product.id}" class="btn">Ver Detalle</a>
            </div>
        `;
        PRODUCTS_CONTAINER.appendChild(card);
    });
    
    // 3. Mejorar la UX: Desplazarse a la sección de productos
    PRODUCTS_TITLE.scrollIntoView({ behavior: 'smooth' });
}

// 4. Iniciar la visualización de categorías al cargar la página
window.addEventListener('load', displayCategories);
