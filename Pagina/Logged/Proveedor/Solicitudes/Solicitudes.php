<?php
header('Content-Type: application/json');
include 'conexion.php';

// Consulta para obtener todos los servicios solicitados con solo la fecha (sin hora)
$query = "SELECT idUsuario, cliente, DATE(fecha_solicitud) AS fecha, servicio_solicitado AS descripcion, estado FROM Servicios_SolicitadosMOVO";
$result = $conn->query($query);

$servicios = [];

if ($result->num_rows > 0) {
    // Recorrer los resultados y almacenarlos en un array
    while ($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
    // Devolver los servicios en formato JSON
    echo json_encode(['success' => true, 'data' => $servicios]);
} else {
    echo json_encode(['success' => true, 'data' => []]);
}

$conn->close();
?>
