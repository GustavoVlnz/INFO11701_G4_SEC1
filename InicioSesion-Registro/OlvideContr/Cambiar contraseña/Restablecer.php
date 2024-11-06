<?php

require_once 'conexion.php'; //conexión a la base de datos

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nuevaContrasena = $_POST['password'];

    // Validación de la contraseña en el servidor
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/', $nuevaContrasena)) {
        echo json_encode(['status' => 'error', 'message' => 'La contraseña no cumple con los requisitos de seguridad.']);
        exit;
    }

    $correo = $_SESSION['correo_verificado'];

    // Encriptar la contraseña antes de almacenarla
    $hashedPassword = password_hash($nuevaContrasena, PASSWORD_DEFAULT);

    // Actualizar la contraseña en la base de datos
    $stmt = $db->prepare("UPDATE usuariosMOVO SET Contrasena = ? WHERE Correo = ?");
    $stmt->bind_param("ss", $hashedPassword, $correo);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Contraseña actualizada exitosamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Hubo un problema al actualizar la contraseña.']);
    }

    $stmt->close();
    $db->close();
}
?>
