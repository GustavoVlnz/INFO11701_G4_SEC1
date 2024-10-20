// Función para formatear el RUT a la forma 12.234.231-4
document.getElementById('rut').addEventListener('input', function(event) {
    const input = event.target;
    let rut = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito
    
    // Si el RUT tiene más de un dígito (cuando tiene texto), aplica formato
    if (rut.length > 1) {
        // Agregar los puntos y el guión de verificación
        rut = rut.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])?$/, "$1.$2.$3-$4");
    }
    
    // Actualizar el valor en el campo de entrada
    input.value = rut;
});
//Funcion para desabilitar boton si no acepta los terminos
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('input[name="terminos"]');
    const submitButton = document.getElementById('BtnRegistro');

    // Inicialmente deshabilita el botón
    submitButton.disabled = true;
    submitButton.classList.add('btn-secondary'); // Color gris cuando está deshabilitado
    submitButton.classList.remove('btn-primary'); // Quitar el color original

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            // Si está marcado, habilita el botón
            submitButton.disabled = false;
            submitButton.classList.remove('btn-secondary');
            submitButton.classList.add('btn-primary'); // Cambiar a color original
        } else {
            // Si no está marcado, deshabilita el botón
            submitButton.disabled = true;
            submitButton.classList.add('btn-secondary'); // Cambiar a gris
            submitButton.classList.remove('btn-primary');
        }
    });
});

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
