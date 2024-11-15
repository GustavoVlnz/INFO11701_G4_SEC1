document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const codigoIngresado = document.getElementById("codigo").value;
    const codigoGuardado = localStorage.getItem("codigo_verificacion");

    // Verificar si el código coincide
    if (codigoIngresado === codigoGuardado) {
        // Cambiar el estado de verificación en la base de datos
        fetch("activarVerificacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: localStorage.getItem("correo") })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                alert("Autenticación en dos pasos activada.");
                window.location.href = "../../InfoAcc/Info.php";
            } else {
                alert("Error al activar la autenticación.");
            }
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("El código ingresado es incorrecto.");
    }
});
