window.onload = function() {
    // Todo el código que debe ejecutarse después de que la página haya cargado completamente
    document.getElementById('Formulario').addEventListener('submit', function(event) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMessage = document.getElementById('error-message');
    
        // Limpiar mensaje de error previo
        errorMessage.textContent = '';
    
        // Comparar contraseñas
        if (password !== confirmPassword) {
            event.preventDefault();  // Evita el envío del formulario
            errorMessage.textContent = 'Las contraseñas no coinciden';  // Muestra el mensaje de error
        }
    });
};
