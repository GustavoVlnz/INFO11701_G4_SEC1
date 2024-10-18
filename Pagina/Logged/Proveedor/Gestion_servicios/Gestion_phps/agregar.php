<?php
include 'conexion.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$nombre_servicio = $data['nombre_servicio'];
$descripcion = $data['descripcion'];
$categoria_id = $data['categoria_id'];

$query = "INSERT INTO serviciosMOVO (nombre_servicio, descripcion, estado, id_categoria)
          VALUES ('$nombre_servicio', '$descripcion', 'pendiente', '$categoria_id')";

if ($conexion->query($query) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conexion->error]);
}
?>
