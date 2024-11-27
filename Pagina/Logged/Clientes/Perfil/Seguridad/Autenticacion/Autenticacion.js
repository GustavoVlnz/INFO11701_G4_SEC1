document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const codigoInput = document.getElementById("codigo");
    const emailForm = document.querySelector("form[action='verificarCuenta.php']");

    emailForm.addEventListener("submit", function (e) {
        if (emailInput && emailInput.value.trim() === "") {
            alert("Por favor, ingresa un correo válido.");
            e.preventDefault();
        }

        if (codigoInput && codigoInput.value.trim() === "") {
            alert("Por favor, ingresa el código de verificación.");
            e.preventDefault();
        }
    });
});
