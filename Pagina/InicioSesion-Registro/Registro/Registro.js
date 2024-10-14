document.addEventListener('DOMContentLoaded', function() {
    // Capturar el evento 'submit' del formulario
    document.getElementById('Formulario').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario recargue la página por defecto

        const formData = new FormData(this); // Crear un objeto FormData con el contenido del formulario

        // Enviar datos a registro.php usando fetch
        fetch('./Backend_registro/registro.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const toastMessage = document.getElementById('toastMessage');
            const toastEl = document.getElementById('liveToast');
            const toast = new bootstrap.Toast(toastEl);

            if (data.success) {
                toastMessage.textContent = data.message; // Mensaje de éxito
                toast.show();

                // Redirigir si es empresa o cliente
                if (data.redirect) {
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 2000);
                }
            } else {
                toastMessage.textContent = data.message; // Mensaje de error
                toast.show();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = 'Error al conectar con el servidor.';
            const toastEl = document.getElementById('liveToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    });
});
