<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Incluye la conexión a la base de datos
include 'conexion.php';

// Consulta a la base de datos para obtener los servicios
$query = "SELECT id_servicio, nombre_servicio, descripcion, estado, id_categoria FROM serviciosMOVO";
$resultado = $conexion->query($query);

$servicios = array();

// Recorre los resultados de la consulta
while ($fila = $resultado->fetch_assoc()) {
    $servicios[] = $fila;
}

// Devuelve los resultados en formato JSON
echo json_encode($servicios);
?>
