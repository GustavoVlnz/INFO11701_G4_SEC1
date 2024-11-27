document.getElementById('Formulario').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('mensaje-error');
    
    // Limpiar mensaje de error predeterminado
    errorMessage.textContent = '';
    errorMessage.classList.add('d-none');

    // Validación de fortaleza de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        event.preventDefault(); // Evita el envío del formulario
        errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.';
        errorMessage.classList.remove('d-none');
        return;
    }

    // Comparar contraseñas
    if (password !== confirmPassword) {
        event.preventDefault(); // Evita el envío del formulario
        errorMessage.textContent = 'Las contraseñas no coinciden.';
        errorMessage.classList.remove('d-none');
        return;
    }
});
