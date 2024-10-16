<?php
header('Content-Type: application/json');
include 'conexion.php'; // Asegúrate de que 'conexion.php' esté configurado correctamente

// Consulta para obtener los servicios de la categoría 'Eventos y Entretenimiento'
$query = "SELECT nombre, precio, imagen FROM serviciosMOVO WHERE categoria = 'Eventos y Entretenimiento'";
$result = $db->query($query);

$servicios = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
}

// Devolver los servicios en formato JSON
echo json_encode($servicios);
?>
