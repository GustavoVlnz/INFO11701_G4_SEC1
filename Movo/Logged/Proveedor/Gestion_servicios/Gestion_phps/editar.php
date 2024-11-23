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

// Validar los datos recibidos
if (isset($data['id'], $data['nombre_servicio'], $data['descripcion_corta'], $data['descripcion_larga'], $data['id_categoria'], $data['precio_servicio'])) {
    $id_servicio = $data['id'];
    $nombre_servicio = $data['nombre_servicio'];
    $descripcion_corta = $data['descripcion_corta'];
    $descripcion_larga = $data['descripcion_larga'];
    $id_categoria = $data['id_categoria'];
    $precio_servicio = $data['precio_servicio'];

    // Verificar que el servicio pertenece al usuario autenticado
    $query_check = $conexion->prepare("SELECT id_servicio FROM Lista_ServiciosMOVO WHERE id_servicio = ? AND id_prestador = ?");
    $query_check->bind_param("ii", $id_servicio, $id_prestador);
    $query_check->execute();
    $result = $query_check->get_result();

    if ($result->num_rows > 0) {
        // Actualizar el servicio
        $query_update = $conexion->prepare("UPDATE Lista_ServiciosMOVO SET nombre_servicio = ?, descripcion_corta = ?, descripcion_larga = ?, id_categoria = ?, precio_servicio = ? WHERE id_servicio = ?");
        $query_update->bind_param("sssidi", $nombre_servicio, $descripcion_corta, $descripcion_larga, $id_categoria, $precio_servicio, $id_servicio);

        if ($query_update->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $query_update->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Servicio no encontrado o no autorizado"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>
