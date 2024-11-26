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

        const formData = new FormData(this);
        const jsonData = {};

        // Convertir FormData a un objeto JSON
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        // Enviar datos a registro.php usando fetch
        fetch('./Backend_registro/registro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json()) // Procesar la respuesta como JSON
        .then(data => {
            const toastMessage = document.getElementById('toastMessage');
            const toastEl = document.getElementById('liveToast');
            const toast = new bootstrap.Toast(toastEl);

            if (data.success) {
                toastMessage.textContent = data.message; // Mensaje de éxito
                toast.show();

                // Redirigir al usuario según el rol
                if (data.rol === 'empresa') {
                    setTimeout(() => {
                        window.location.href = '../Verificacion/FormVer.html'; // Redirige a empresa
                    }, 2000);
                } else if (data.rol === 'cliente') {
                    setTimeout(() => {
                        window.location.href = '../../Logged/Clientes/HomeLogeado/home.html'; // Redirige a cliente
                    }, 2000);
                } else {
                    console.error('Rol no reconocido:', data.rol); // Manejo de errores en caso de un valor inesperado
                }
            } else {
                toastMessage.textContent = data.message; // Mensaje de error (correo ya registrado u otro error)
                toast.show();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = 'Error al conectar con el servidor o respuesta no válida.';
            const toastEl = document.getElementById('liveToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    });
});


document.getElementById('Formulario').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('mensaje-error');
    
    errorMessage.classList.add('d-none'); // Ocultar mensaje de error inicialmente
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    // Validar fortaleza de la contraseña
    if (!passwordRegex.test(password)) {
        event.preventDefault(); 
        errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y numeros.';
        errorMessage.classList.remove('d-none'); // Mostrar mensaje de error
    }
    
    // Validar que ambas contraseñas coincidan
    if (password !== confirmPassword) {
        event.preventDefault(); 
        errorMessage.textContent = 'Las contraseñas no coinciden.';
        errorMessage.classList.remove('d-none'); 
    }
});

