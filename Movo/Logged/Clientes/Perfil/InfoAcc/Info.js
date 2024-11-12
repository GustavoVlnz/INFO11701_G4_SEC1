function habilitarEdicion() {
    document.getElementById("nombres").disabled = false;
    document.getElementById("apellidos").disabled = false;
    document.getElementById("genero").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("direccion").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("guardarBtn").style.display = "inline";
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
        alert(data);  // Mostrar mensaje de confirmación o error
        location.reload();  // Recargar la página para actualizar los datos
    })
    .catch(error => console.error("Error:", error));
}
