// Inicialización de EmailJS
emailjs.init("yznFfV3mCG_WiP22y");

function enviarCodigo(correo) {
    // Generar un código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);

    // Guardar el código en localStorage para compararlo luego
    localStorage.setItem("codigo_verificacion", codigo);

    
    const templateParams = {
        email_to: correo,
        codigo: codigo,
    };

    // Enviar el correo con el código de verificación
    emailjs.send('service_vuwonco', 'template_9tuwxdc', templateParams)
        .then(function(response) {
            alert("Código de verificación enviado.");
        }, function(error) {
            console.log("Error al enviar el código:", error);
        });
}

// Evento para enviar el código al presionar el botón
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const correo = event.target.correo.value;

    // Validar si el correo está registrado en la base de datos
    fetch("verificarCorreo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.registrado) {
            enviarCodigo(correo);
            window.location.href = "Autenticacion2.html";
        } else {
            alert("El correo no está registrado.");
        }
    })
    .catch(error => console.error("Error:", error));
});
