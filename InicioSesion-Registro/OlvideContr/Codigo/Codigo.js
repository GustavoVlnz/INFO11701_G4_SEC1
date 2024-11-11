// Función para verificar el código ingresado por el usuario
function verificarCodigo(event) {
    event.preventDefault();  // Prevenir el envío normal del formulario

    const codigoIngresado = document.getElementById('Code').value;  // Obtener el código ingresado por el usuario
    const codigoGuardado = localStorage.getItem('codigoConfirmacion');  // Obtener el código almacenado en localStorage

    if (codigoIngresado === codigoGuardado) {
        alert('Código verificado correctamente. Puedes proceder a cambiar tu contraseña.');
        // Aquí puedes redirigir al usuario a la página de cambio de contraseña
        window.location.href = 'Restablecer.html';  // Cambia esto por la ruta de tu página de cambio de contraseña
    } else {
        alert('El código ingresado es incorrecto. Por favor, verifica e intenta nuevamente.');
    }
}

document.getElementById('Confirmar').addEventListener('click', verificarCodigo);

// Evento para reenviar el código al correo
document.getElementById('Reenviar').addEventListener('click', function() {
    // Redirige al usuario de vuelta a la página de ingreso del correo para enviar un nuevo código
    window.location.href = 'Correo.html';  
});