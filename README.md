# 🛒 JPG SPORTSHOP

## Descripción del Proyecto

**JPG SPORTSHOP** es una aplicación web de comercio electrónico (e-commerce) simple, construida con HTML, CSS y JavaScript Vanilla. El proyecto simula las funcionalidades esenciales de una tienda deportiva, enfocándose en la **gestión de autenticación**, la **visualización dinámica de productos** (destacados y por categorías) y la **gestión completa del carrito de compras** mediante el almacenamiento local (`localStorage`).

El sistema está diseñado para ser la capa de presentación (frontend) de una aplicación, con llamadas simuladas (o planificadas) a un backend (ej. `login.php`, `carrito.php`) para el manejo real de la autenticación y la validación de precios.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura de las páginas.
* **CSS3:** Estilos básicos y *responsive*.
* **JavaScript (Vanilla JS):** Toda la lógica de la aplicación, incluyendo la manipulación del DOM, el manejo de datos en `localStorage` y las llamadas asíncronas (simuladas o reales) a la API.

---

## 🚀 Funcionalidades Principales

El proyecto consta de las siguientes áreas y características:

1.  **🔒 Autenticación:**
    * `login.html`: Permite el acceso a la tienda.
    * Usa `localStorage` para almacenar un *token* (`authToken`) y los datos de la tienda (`tiendaData`) tras un inicio de sesión exitoso.
    * Implementa un sistema de seguridad básico de redirección si el token no existe.

2.  **🏠 Dashboard (`dashboard.html`):**
    * Muestra una sección de **Productos Destacados** (`destacado: true`).
    * Muestra una vista rápida para **Explorar Categorías**.

3.  **🏷️ Categorías (`categories.html`):**
    * Muestra una cuadrícula de todas las categorías disponibles.
    * Permite filtrar la lista de productos al hacer clic en una categoría.

4.  **🖼️ Ficha de Producto (`product.html`):**
    * Muestra los detalles de un producto específico (usando el `id` en la URL).
    * Implementa un selector de **Talla** dinámico para productos que lo requieran (ej. Zapatillas, Camisetas).
    * Muestra una sección de **Productos Vistos Recientemente** (`productosVistos`) utilizando `localStorage`.

5.  **🛒 Carrito de Compras (`cart.html`):**
    * Gestión persistente del carrito mediante `localStorage` (`carrito`).
    * Permite **añadir**, **eliminar**, y **actualizar la cantidad** de los productos.
    * Manejo de ítems con **Talla** (`id` y `size` como identificador único).
    * Simulación de proceso de **Checkout** (`checkout` function) para validar los precios con una API externa (simulada en `carrito.php`).

