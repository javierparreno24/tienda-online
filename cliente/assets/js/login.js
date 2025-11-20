document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    const LOGIN_API_URL = 'http://localhost/tienda-online/servidor/login.php'; 

    messageElement.textContent = 'Iniciando sesión...';
    messageElement.style.color = 'black';

    try {
        const response = await fetch(LOGIN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok && data.success) {
            //Almacenamiento del token exitoso y datos de la tienda
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('tiendaData', JSON.stringify(data.tiendaData));
            messageElement.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
            messageElement.style.color = 'green';
            
            // Redirigir a la página dashboard
            window.location.href = 'dashboard.html';
        } else {
            messageElement.textContent = data.error || 'Error en el inicio de sesión. Por favor, inténtalo de nuevo.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error durante el fetch:', error);
        messageElement.textContent = 'No se pudo conectar con el servidor api. Por favor, inténtalo de nuevo más tarde.';
        messageElement.style.color = 'red';
    }
});