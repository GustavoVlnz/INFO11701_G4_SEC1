<?php
// Habilitar el modo de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexion.php'; // Conexión a la base de datos
session_start(); // Iniciar sesión

header('Content-Type: application/json'); // Establece la respuesta como JSON

// Inicializamos el array de respuesta
$response = array('success' => false, 'message' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombres = $_POST['username'] ?? '';
    $apellidos = $_POST['apellido'] ?? '';
    $rut = $_POST['rut'] ?? '';
    $genero = $_POST['genero'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm-password'] ?? ''; // Confirmar contraseña
    $rol = $_POST['Rol'] ?? '';

    // Validación: Verificar que las contraseñas coincidan
    if ($password !== $confirm_password) {
        $response['message'] = 'Las contraseñas no coinciden.';
        echo json_encode($response);
        exit();
    }

    // Validación adicional: verificar si el email ya está registrado
    $email_check_sql = "SELECT * FROM usuariosMOVO WHERE email = ?";
    $stmt = $db->prepare($email_check_sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response['message'] = 'El correo ya está registrado.';
        echo json_encode($response);
        exit();
    }

    // Consulta SQL para insertar los datos
    $insert_sql = "INSERT INTO usuariosMOVO (nombres, apellidos, rut, genero, email, password, rol) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $db->prepare($insert_sql);
    $stmt->bind_param("sssssss", $nombres, $apellidos, $rut, $genero, $email, $password, $rol);

    try {
        if ($stmt->execute()) {
            // Obtener el ID del usuario recién insertado
            $user_id = $db->insert_id;

            // Guardar el ID y el rol del usuario en la sesión
            $_SESSION['idUsuarios'] = $user_id;
            $_SESSION['rol'] = $rol;

            // Respuesta exitosa con el rol y el ID para el frontend
            $response['success'] = true;
            $response['message'] = 'Registro exitoso.';
            $response['rol'] = $rol; // Enviar el rol al frontend
            $response['user_id'] = $user_id; // Enviar el ID al frontend
        } else {
            // Error en la consulta de inserción
            $response['message'] = 'Error al registrar: ' . $stmt->error;
        }
    } catch (Exception $e) {
        // Capturar cualquier excepción
        $response['message'] = 'Error en la ejecución: ' . $e->getMessage();
    }

    // Cerrar la conexión
    $stmt->close();
    $db->close();

    // Devolver la respuesta JSON
    echo json_encode($response);
    exit();
}
?>
