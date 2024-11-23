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

// Validar que todos los datos necesarios estén presentes
if (isset($data['nombre_servicio'], $data['descripcion_corta'], $data['descripcion_larga'], $data['id_categoria'], $data['precio_servicio'])) {
    $nombre_servicio = $data['nombre_servicio'];
    $descripcion_corta = $data['descripcion_corta'];
    $descripcion_larga = $data['descripcion_larga'];
    $id_categoria = $data['id_categoria'];
    $precio_servicio = $data['precio_servicio'];

    // Estado por defecto
    $estado_servicio = 'en revision';

    // Preparar y ejecutar la consulta de inserción
    $query = $conexion->prepare("INSERT INTO Lista_ServiciosMOVO (id_prestador, nombre_servicio, id_categoria, precio_servicio, descripcion_larga, descripcion_corta, estado_servicio) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("isidsss", $id_prestador, $nombre_servicio, $id_categoria, $precio_servicio, $descripcion_larga, $descripcion_corta, $estado_servicio);

    if ($query->execute()) {
        echo json_encode(["success" => true, "id_servicio" => $conexion->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => $query->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>
