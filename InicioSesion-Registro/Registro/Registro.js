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
