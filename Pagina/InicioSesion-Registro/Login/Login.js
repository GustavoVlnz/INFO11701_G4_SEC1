document.getElementById('loginform').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar datos a login.php usando fetch
    fetch('./BackendLogin/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password })
    })
    .then(response => response.text()) // Obtiene el contenido como texto
    .then(data => {
        try {
            // Intenta convertir a JSON
            const jsonData = JSON.parse(data);
            if (jsonData.success) {
                mostrarToast(jsonData.message);
                setTimeout(() => {
                    window.location.href = "../../Logged/Clientes/HomeLogeado/home.html";
                }, 2000);
            } else {
                mostrarToast(jsonData.message);
            }
        } catch (error) {
            // Muestra el error si no es un JSON válido
            console.error('Error al analizar la respuesta:', error);
            console.log('Contenido recibido:', data);
            mostrarToast('Error inesperado en la respuesta del servidor.');
        }
    })
    .catch(error => {
        console.error('Error de conexión:', error);
        mostrarToast('Error al conectar con el servidor.');
    });
});

// Función para mostrar la notificación
function mostrarToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}