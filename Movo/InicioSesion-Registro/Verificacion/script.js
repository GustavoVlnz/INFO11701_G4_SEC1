// Inicializar EmailJS
function initEmailJS() {
    emailjs.init('BLiPjdJRj3FIT0OeH'); // Reemplaza con tu User ID de EmailJS
}

// Función para manejar el envío del formulario
function handleFormSubmit() {
    const form = document.getElementById('verificacion-tienda-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            // Validar que los campos obligatorios no estén vacíos
            if (!form.checkValidity()) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            // Recoger los datos del formulario
            const templateParams = {
                NombreTienda: document.getElementById('NombreTienda').value,
                Direccion: document.getElementById('Direccion').value,
                Contacto: document.getElementById('Contacto').value,
                Correo: document.getElementById('Correo').value,
                Descripcion: document.getElementById('Descripcion').value,
                Socials: document.getElementById('Socials').value || 'No proporcionado' // Si no se proporcionan redes sociales
            };

            // Mostrar un mensaje de carga mientras se envía el correo
            const submitButton = form.querySelector('input[type="submit"]');
            submitButton.disabled = true;
            submitButton.value = 'Enviando...';

            // Enviar correo usando EmailJS
            emailjs.send('service_w64dk1e', 'template_mxslesp', templateParams)
                .then(function(response) {
                    console.log('Correo enviado con éxito!', response.status, response.text);
                    alert('Correo enviado exitosamente!');

                    // Restablecer el texto del botón y reactivar el botón
                    submitButton.value = 'Verificar Tienda';
                    submitButton.disabled = false;

                    // Redirigir después de enviar el correo exitosamente
                    setTimeout(function() {
                        window.location.href = '../../Logged/Clientes/HomeLogeado/home.html';  // Ruta a la que deseas redirigir
                    }, 1000);  // Ajusta el tiempo si es necesario
                }, function(error) {
                    console.error('Error al enviar el correo:', error);
                    alert('Hubo un problema al enviar el correo, intenta de nuevo.');

                    // Restablecer el texto del botón y reactivar el botón
                    submitButton.value = 'Verificar Tienda';
                    submitButton.disabled = false;
                });
        });
    } else {
        console.error("El formulario con id 'verificacion-tienda-form' no se encontró en el DOM.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();  // Inicializar EmailJS
    handleFormSubmit();  // Manejar el envío del formulario
});
