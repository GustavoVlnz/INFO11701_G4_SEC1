<?php
session_start(); // Iniciar la sesión
include 'conexion.php'; // Asegúrate de que 'conexion.php' conecta bien a la BD

header('Content-Type: application/json'); // Establecer la respuesta como JSON

$error = ''; // Variable para errores lógicos
$executionError = ''; // Variable para errores de ejecución

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Para capturar excepciones

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Consulta para verificar usuario y contraseña, incluyendo el id_usuario
        $sql = "SELECT idUsuarios, rol FROM usuariosMOVO WHERE email = ? AND password = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id_usuario, $rol); // Obtener id y rol
            $stmt->fetch();

            // Guardar id y rol en la sesión
            $_SESSION['idUsuarios'] = $id_usuario;
            $_SESSION['rol'] = $rol;

            // Devolver respuesta de éxito
            echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
        } else {
            // Usuario no encontrado
            echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos.']);
        }
    } catch (Exception $e) {
        // Capturar errores de ejecución
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }

    $stmt->close();
    $db->close();
}
?>
