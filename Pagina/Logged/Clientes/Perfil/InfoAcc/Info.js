function habilitarEdicion() {
    document.getElementById("nombres").disabled = false;
    document.getElementById("apellidos").disabled = false;
    document.getElementById("genero").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("direccion").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("guardarBtn").style.display = "inline";
}

function mostrarToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 5000 });  // Duración de 5 segundos
    toast.show();
}


function guardarCambios() {
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const genero = document.getElementById("genero").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    fetch("actualizar_perfil.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nombres=${encodeURIComponent(nombres)}&apellidos=${encodeURIComponent(apellidos)}&genero=${encodeURIComponent(genero)}&email=${encodeURIComponent(email)}&direccion=${encodeURIComponent(direccion)}&telefono=${encodeURIComponent(telefono)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Verificar el mensaje en la consola
        mostrarToast(data);  // Mostrar el mensaje en el Toast
        setTimeout(() => location.reload(), 3000); 
    })
    .catch(error => console.error("Error:", error));
}

function validarTelefono(input) {
    // Eliminar caracteres no numéricos, excepto el prefijo + y espacios
    input.value = input.value.replace(/[^\d\s\+]/g, "");

    // Validar el formato específico
    const regex = /^\+56 9 \d{4} \d{4}$/;
    if (!regex.test(input.value)) {
        input.setCustomValidity("Formato inválido. Use el formato +569");
    } else {
        input.setCustomValidity("");
    }
}
