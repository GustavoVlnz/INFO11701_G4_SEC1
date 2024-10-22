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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarToast(data.message); // Notificación de éxito

            // Redirigir tras un breve delay
            setTimeout(() => {
                window.location.href = "../../Logged/Clientes/HomeLogeado/home.html";
            }, 2000);
        } else {
            mostrarToast(data.message); // Notificación de error
        }
    })
    .catch(error => {
        console.error('Error:', error);
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