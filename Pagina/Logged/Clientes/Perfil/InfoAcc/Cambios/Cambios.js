// Inicializar EmailJS con tu clave pública
(function() {
    emailjs.init("yznFfV3mCG_WiP22y");  // Reemplaza con tu clave pública de EmailJS
})();

// Función para manejar el envío del correo de confirmación
function enviarConfirmacionCorreo(event) {
    event.preventDefault();  // Prevenir la acción por defecto del formulario

    const userEmail = document.getElementById('correo').value;  // Obtener el correo ingresado

    if (userEmail) {
        // Parámetros para enviar el correo
        var emailParams = {
            email: userEmail,
            message: "Su correo ha sido actualizado exitosamente en MOVO."
        };

        // Enviar el correo usando EmailJS
        emailjs.send('service_vuwonco', 'template_chrjarw', emailParams)
            .then(function(response) {
                console.log('Correo enviado con éxito!', response.status, response.text);
                alert('Se ha enviado un correo de confirmación.');
            }, function(error) {
                console.log('Error al enviar el correo.', error);
                alert('Hubo un problema al enviar el correo de confirmación.');
            });
    } else {
        alert('Por favor, ingresa un correo válido.');
    }
}

// Asignar el evento al botón de guardar
document.getElementById('Boton').addEventListener('click', enviarConfirmacionCorreo);
