<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión a la base de datos
include_once 'conex.inc'; // Asegúrate de que el archivo está correcto

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar que se recibió el ID del usuario
    if (!isset($_POST['idUsuarios']) || empty($_POST['idUsuarios'])) {
        http_response_code(400); // Código 400: Solicitud incorrecta
        echo "No se recibió el ID del usuario.";
        exit;
    }

    $idUsuarios = intval($_POST['idUsuarios']);

    // Preparar la consulta para eliminar al usuario
    $query = "DELETE FROM usuariosMOVO WHERE idUsuarios = ?";
    $stmt = $db->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $idUsuarios);
        if ($stmt->execute()) {
            echo "Usuario eliminado correctamente";
        } else {
            http_response_code(500); // Código 500: Error interno del servidor
            echo "Error al eliminar el usuario: " . $stmt->error;
        }
        $stmt->close();
    } else {
        http_response_code(500); // Código 500: Error interno del servidor
        echo "Error al preparar la consulta: " . $db->error;
    }
} else {
    http_response_code(405); // Código 405: Método no permitido
    echo "Método no permitido.";
}
