document.getElementById('Formulario').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('mensaje-error');
    //Crea las constantes con info del html
       
    errorMessage.textContent = ''; // Limpiar mensaje de error predeterminado
    
    // Comparar contraseñas
    if (password !== confirmPassword) {
        event.preventDefault();  // Evita el envio del formulario
        errorMessage.textContent = 'Las contraseñas no coinciden'; // Muestra el mensaje de error
    }
});
