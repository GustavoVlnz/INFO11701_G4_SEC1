<?php
session_start(); // Iniciar sesión
header('Content-Type: application/json');
include 'conexion.php'; // Conexión a la base de datos

$data = json_decode(file_get_contents('php://input'), true);

// Verificar si el usuario está autenticado
if (!isset($_SESSION['idUsuarios'])) {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit;
}

// Obtener el ID del usuario desde la sesión
$id_prestador = $_SESSION['idUsuarios'];

// Validar el ID del servicio
if (isset($data['id'])) {
    $id_servicio = $data['id'];

    // Verificar que el servicio pertenece al usuario autenticado
    $query_check = $conexion->prepare("SELECT id_servicio FROM Lista_ServiciosMOVO WHERE id_servicio = ? AND id_prestador = ?");
    $query_check->bind_param("ii", $id_servicio, $id_prestador);
    $query_check->execute();
    $result = $query_check->get_result();

    if ($result->num_rows > 0) {
        // Eliminar el servicio
        $query_delete = $conexion->prepare("DELETE FROM Lista_ServiciosMOVO WHERE id_servicio = ?");
        $query_delete->bind_param("i", $id_servicio);

        if ($query_delete->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $query_delete->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Servicio no encontrado o no autorizado"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>
