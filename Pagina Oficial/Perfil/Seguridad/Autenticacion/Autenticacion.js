
// Inicializa EmailJS con tu User ID
(function () {
    emailjs.init('yznFfV3mCG_WiP22y'); // Sustituye por tu User ID de EmailJS
})();

function sendAuthCode() {
    const email = document.getElementById('email').value;
    const authCode = Math.floor(100000 + Math.random() * 900000); // Generar código de 6 dígitos

    const templateParams = {
        username: username,
        auth: authCode,
        email: email,
    };

    // Envía el correo utilizando el servicio EmailJS
    emailjs.send('service_vuwonco', 'template_9tuwxdc', templateParams)
        .then(function(response) {
            alert('Código de autenticación enviado a ' + email);
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}