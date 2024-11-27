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



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('Formulario');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('mensaje-error');

    // Función para validar la contraseña
    function validarContraseña() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        // Ocultar mensaje de error inicialmente
        errorMessage.classList.add('d-none');

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Validar fortaleza de la contraseña
        if (!passwordRegex.test(password)) {
            errorMessage.textContent =
                'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.';
            errorMessage.classList.remove('d-none');
            return false; // Contraseña no válida
        }

        // Validar que ambas contraseñas coincidan
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Las contraseñas no coinciden.';
            errorMessage.classList.remove('d-none');
            return false; // Contraseñas no coinciden
        }

        return true; // Contraseña válida
    }

    // Evento 'submit' del formulario
    form.addEventListener('submit', function (event) {
        // Detener el evento de envío si la contraseña no es válida
        if (!validarContraseña()) {
            event.preventDefault();
            return; // Salir de la función sin continuar
        }

        // Preparar los datos para enviar al servidor
        const formData = new FormData(this);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Enviar datos al servidor con fetch
        fetch('./Backend_registro/registro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => response.json())
            .then((data) => {
                const toastMessage = document.getElementById('toastMessage');
                const toastEl = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastEl);

                if (data.success) {
                    toastMessage.textContent = data.message; // Mensaje de éxito
                    toast.show();

                    // Redirigir al usuario según el rol
                    if (data.rol === 'empresa') {
                        setTimeout(() => {
                            window.location.href = '../Verificacion/FormVer.html';
                        }, 2000);
                    } else if (data.rol === 'cliente') {
                        setTimeout(() => {
                            window.location.href = '../../Logged/Clientes/HomeLogeado/home.html';
                        }, 2000);
                    } else {
                        console.error('Rol no reconocido:', data.rol);
                    }
                } else {
                    toastMessage.textContent = data.message; // Mensaje de error
                    toast.show();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                const toastMessage = document.getElementById('toastMessage');
                toastMessage.textContent =
                    'Error al conectar con el servidor o respuesta no válida.';
                const toastEl = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            });

        // Detener el envío del formulario para esperar la respuesta de fetch
        event.preventDefault();
    });
});