// Definir constantes para usuarios
const users = [
    { email: 'admin@example.com', password: 'adminpass', role: 'administrador' },
    { email: 'proveedor@example.com', password: 'proveedorpass', role: 'proveedor' },
    { email: 'cliente@example.com', password: 'clientepass', role: 'cliente' }
];

// Manejar el evento de envío del formulario
document.getElementById('Login_Box').addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío del formulario de manera tradicional

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar las credenciales
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const redirectPath = getRedirectPath(user.role);
        if (redirectPath) {
            window.location.href = redirectPath; // Redirigir a la ruta construida
        } else {
            alert('Rol no permitido');
        }
    } else {
        // Manejar errores si las credenciales no son válidas
        alert('Usuario o contraseña incorrectos');
    }
});

// Función para construir la ruta según el rol
function getRedirectPath(role) {
    switch (role) {
        case 'administrador':
            return '../Pagina/Pagina_administrador/vista admin/admin.html';
        case 'proveedor':
            return '../Pagina/Pagina_proveedor/VistaPrestador/VistaPrestador.html'; // Asegúrate de que la ruta sea correcta
        case 'cliente':
            return '../Pagina/Pagina_cliente/categorias/categorias.html'; // Asegúrate de que la ruta sea correcta
        default:
            return null;
    }
}
