window.onload = function() {
    // Inicializa EmailJS cuando la página esté completamente cargada
    emailjs.init('yznFfV3mCG_WiP22y'); // Reemplaza con tu User ID desde EmailJS

    // Agregar evento al formulario
    const formulario = document.querySelector('form');
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();  // Previene el envío inmediato del formulario
        
        const email = document.getElementById('email').value;
        
        // Validar el correo ingresado
        if (!email) {
            alert("Por favor, ingrese un correo válido.");
            return;
        }

        // Generar un código de confirmación
        const codigoConfirmacion = generarCodigoConfirmacion();

        // Enviar el correo con el código de confirmación
        enviarCorreoConfirmacion(email, codigoConfirmacion);
    });
};

// Función para generar un código de confirmación aleatorio
function generarCodigoConfirmacion() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
}

// Función para enviar el correo de confirmación
function enviarCorreoConfirmacion(email, codigo) {
    const variables = {
        email: email,  // La variable debe coincidir con {{to_email}} en la plantilla
        codigo_confirmacion: codigo // Variable que se usa en el email para el código
    };

    emailjs.send('service_vuwonco', 'template_chrjarw', variables)
    .then(function(response) {
        console.log('Correo de confirmación enviado exitosamente', response.status, response.text);
        alert(`Se ha enviado un código de confirmación a ${email}. Por favor, revisa tu bandeja de entrada.`);
        // Aquí podrías redirigir a otra página para ingresar el código de confirmación.
    }, function(error) {
        console.log('Error al enviar el correo de confirmación', error);
        alert("Hubo un error al enviar el correo. Inténtalo nuevamente.");
    });
}
