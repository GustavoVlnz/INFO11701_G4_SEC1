// Inicialización de EmailJS
emailjs.init("yznFfV3mCG_WiP22y");

function enviarCodigo(correo) {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("codigo_verificacion", codigo);
    localStorage.setItem("correo", correo);

    const templateParams = {
        email_to: correo,
        codigo: codigo,
    };

    emailjs.send('service_vuwonco', 'template_9tuwxdc', templateParams)
        .then(function(response) {
            alert("Código de verificación enviado.");
        }, function(error) {
            console.log("Error al enviar el código:", error);
        });
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const correo = event.target.correo.value;

    fetch("verificarCorreo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.registrado) {
            enviarCodigo(correo);
            window.location.href = "../Codigo/Codigo.html";
        } else {
            alert("El correo no está registrado.");
        }
    })
    .catch(error => console.error("Error:", error));
});
