// Inicializar EmailJS con tu clave pública
(function() {
    emailjs.init("yznFfV3mCG_WiP22y");  // Reemplaza con tu clave pública de EmailJS
})();

// Función para generar un código de confirmación aleatorio
function generarCodigo() {
    return Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
}

// Función para manejar el envío del correo con el código
function enviarCodigoCorreo(event) {
    event.preventDefault();  // Prevenir el envío normal del formulario

    const userEmail = document.getElementById('email').value;  // Obtener el correo ingresado
    const codigo = generarCodigo();  // Generar el código de confirmación

    if (userEmail) {
        // Parámetros para enviar el correo
        var emailParams = {
            to_email: userEmail,
            message: "Su código de confirmación para restablecer su contraseña es: " + codigo
        };

        // Enviar el correo usando EmailJS
        emailjs.send('service_vuwonco', 'template_chrjarw', emailParams)
            .then(function(response) {
                console.log('Correo enviado con éxito!', response.status, response.text);
                alert('Se ha enviado un código de confirmación a tu correo.');
                // Guardar el código en localStorage (o cualquier otro lugar) para su posterior verificación
                localStorage.setItem('codigoConfirmacion', codigo);
            }, function(error) {
                console.log('Error al enviar el correo.', error);
                alert('Hubo un problema al enviar el correo de confirmación.');
            });
    } else {
        alert('Por favor, ingresa un correo válido.');
    }
}

// Asignar el evento al botón de enviar
document.getElementById('Confirmar').addEventListener('click', enviarCodigoCorreo);
