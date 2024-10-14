

document.getElementById('Formulario').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('mensaje-error');
    //Crea las constantes con info del html
       
    errorMessage.textContent = ''; // Limpiar mensaje de error predeterminado
    
    // Comparar contraseñas
    if (password !== confirmPassword) {
        event.preventDefault();  // Evita el envio del formulario
        errorMessage.textContent = 'Las contraseñas no coinciden'; // Muestra el mensaje de error
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