<?php
session_start();

// Asumiendo que el rol del usuario ya está almacenado en la sesión
// Ejemplo: $_SESSION['user_role'] = 'admin';
if (!isset($_SESSION['rol'])) {
    // Si el rol no está establecido, redirigir al login o página de error
    header("Location: login.php");
    exit();
}

// Función para redirigir a la página de perfil correspondiente según el rol
function redirigirPorRol($rol) {
    switch ($rol) {
        case 'admin':
            header("Location: ./Administrador/vista admin/admin.html");
            break;
        case 'empresa':
            header("Location: ./Proveedor/VistaPrestador/VistaPrestador.html");
            break;
        case 'cliente':
            header("Location: ./Clientes/Perfil/InfoAcc/Info.html");
            break;
        default:
            // Si el rol no es reconocido, redirigir a una página de error o login
            header("Location: login.php");
            break;
    }
    exit();
}

// Llamar a la función con el rol de la sesión
redirigirPorRol($_SESSION['rol']);
?>
