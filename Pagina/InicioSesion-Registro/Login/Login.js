document.getElementById('loginform').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

<<<<<<< HEAD
    // Enviar datos a login.php usando fetch
=======
>>>>>>> Alex
    fetch('./BackendLogin/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password })
    })
<<<<<<< HEAD
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
=======
    .then(response => response.json()) // Analiza directamente como JSON
    .then(jsonData => {
        if (jsonData.success) {
            mostrarToast(jsonData.message);

            // Verificar si tiene reseñas pendientes después del inicio de sesión
            fetch('./BackendLogin/reseñas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.hasPendingReviews) {
                    // Redirigir a la vista de reseñas si hay servicios pendientes por calificar
                    setTimeout(() => {
                        window.location.href = "../../Logged/Clientes/reseña_servicio/reseña.php";
                    }, 2000);
                } else {
                    // Si no hay reseñas pendientes, redirigir al inicio
                    setTimeout(() => {
                        window.location.href = "../../Logged/Clientes/HomeLogeado/home.html";
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error al verificar las reseñas pendientes:', error);
                mostrarToast('Error al verificar las reseñas pendientes.');
            });
        } else {
            mostrarToast(jsonData.message);
>>>>>>> Alex
        }
    })
    .catch(error => {
        console.error('Error de conexión:', error);
        mostrarToast('Error al conectar con el servidor.');
    });
});

<<<<<<< HEAD
=======

>>>>>>> Alex
// Función para mostrar la notificación
function mostrarToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}