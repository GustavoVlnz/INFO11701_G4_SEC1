<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
include 'conexion.php';

// Obtener todos los servicios
$sql = "SELECT id_servicio, proveedor_nombre, nombre_servicio, id_categoria, descripcion, estado_servicio, precio_servicio, fecha_registrado 
        FROM Lista_ServiciosMOVO";
$result = $conn->query($sql);

$servicios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
    echo json_encode($servicios);
} else {
    echo json_encode(["mensaje" => "No se encontraron servicios"]);
}

$conn->close();
?>
