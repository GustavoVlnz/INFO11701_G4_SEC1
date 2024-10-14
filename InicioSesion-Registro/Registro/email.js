window.onload = function() {
    // Inicializa EmailJS cuando la página esté completamente cargada
    emailjs.init('yznFfV3mCG_WiP22y'); // Reemplaza con tu User ID desde EmailJS

    // Agregar evento al formulario
    const formulario = document.getElementById('Formulario');
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();  // Previene el envío inmediato del formulario
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const username = document.getElementById('username').value;
        const rut = document.getElementById('rut').value;
        const rol = document.getElementById('Rol').value;
        const genero = document.getElementById('genero').value;
        const errorMessage = document.getElementById('mensaje-error');
        
        errorMessage.textContent = ''; // Limpiar cualquier mensaje de error previo

        // Validar contraseñas
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Las contraseñas no coinciden';
            return;  // Detener el flujo si las contraseñas no coinciden
        }

        // Si las contraseñas coinciden, enviar el correo
        enviarCorreoRegistro(email, username, rut, rol, genero, formulario);
    });
};

// Función para enviar correo de confirmación de registro
function enviarCorreoRegistro(email, username, rut, rol, genero, formulario) {
    // Verifica que la variable email no esté vacía
    if (!email) {
        console.log("El correo electrónico no fue proporcionado");
        return;
    }

    const variables = {
        email: email,  // La variable debe coincidir con {{email}} en la plantilla
        username: username,  // Coincide con {{username}} en la plantilla
        rut: rut,  // Coincide con {{rut}} en la plantilla
        rol: rol,  // Coincide con {{rol}} en la plantilla
        genero: genero  // Coincide con {{genero}} en la plantilla
    };

    emailjs.send('service_vuwonco', 'template_9tuwxdc', variables)
    .then(function(response) {
        console.log('Correo de registro enviado exitosamente', response.status, response.text);
        alert("Registro exitoso. Se ha enviado un correo de confirmación.");

        // Resetear el formulario después de que el correo sea enviado correctamente
        formulario.reset();
    }, function(error) {
        console.log('Error al enviar el correo de registro', error);
        alert("Hubo un error al enviar el correo. Inténtalo nuevamente.");
    });
}
