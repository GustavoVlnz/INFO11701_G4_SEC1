
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const codigoIngresado = document.getElementById("codigo").value;
    const codigoGuardado = localStorage.getItem("codigo_verificacion");
    const correo = localStorage.getItem("correo");

    if (codigoIngresado === codigoGuardado) {
        fetch("activarVerificacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: correo })
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