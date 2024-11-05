<?php
header('Content-Type: application/json');
include 'conexion.php';

// Decodifica el JSON recibido
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si se enviaron los datos requeridos
if (isset($data['id'], $data['nombre_servicio'], $data['descripcion'], $data['id_categoria'])) {
    $id_servicio = $data['id'];
    $nombre_servicio = $data['nombre_servicio'];
    $descripcion = $data['descripcion'];
    $categoria_id = $data['id_categoria'];

    // Prepara la consulta SQL para actualizar el servicio
    $query = "UPDATE serviciosMOVO SET nombre_servicio = ?, descripcion = ?, id_categoria = ? WHERE id_servicio = ?";
    
    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("ssii", $nombre_servicio, $descripcion, $categoria_id, $id_servicio);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se encontraron cambios o el servicio no existe.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos.']);
}
?>
