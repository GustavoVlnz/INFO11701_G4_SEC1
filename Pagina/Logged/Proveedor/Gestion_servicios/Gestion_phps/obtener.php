<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
<<<<<<< HEAD

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
=======
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
>>>>>>> Alex
?>
