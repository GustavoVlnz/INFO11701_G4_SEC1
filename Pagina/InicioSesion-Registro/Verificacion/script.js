// Cargar EmailJS desde el CDN
(function() {
    emailjs.init('BLiPjdJRj3FIT0OeH'); // Reemplaza TU_USER_ID con tu User ID de EmailJS
})();

// Manejar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verificacion-tienda-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        // Recoger los datos del formulario
        const templateParams = {
            NombreTienda: document.getElementById('NombreTienda').value,
            Direccion: document.getElementById('Direccion').value,
            Contacto: document.getElementById('Contacto').value,
            Correo: document.getElementById('Correo').value,
            Descripcion: document.getElementById('Descripcion').value,
            Socials: document.getElementById('Socials').value || 'No proporcionado' // Si no se proporcionan redes sociales
        };

        // Enviar correo usando EmailJS
        emailjs.send('service_w64dk1e', 'template_mxslesp', templateParams)
            .then(function(response) {
                console.log('Correo enviado con éxito!', response.status, response.text);
                alert('Correo enviado exitosamente!');
            }, function(error) {
                console.error('Error al enviar el correo:', error);
                alert('Hubo un problema al enviar el correo, intenta de nuevo.');
            });
    });
});
