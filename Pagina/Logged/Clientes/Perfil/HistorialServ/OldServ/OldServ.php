<?php

include 'conexion.php'; // Archivo que contiene la conexión a la base de datos

session_start();
$usuario_id = $_SESSION['idUsuarios']; 

// Consulta para obtener los servicios completados
$sql = "SELECT nombre_servicio, fecha_completado, ganancia FROM Servicios_CompletadosMOVO WHERE cliente = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$resultado = $stmt->get_result();

$servicios = [];
while ($fila = $resultado->fetch_assoc()) {
    $servicios[] = $fila;
}

// Enviar la respuesta en formato JSON
echo json_encode($servicios);

$stmt->close();
$db->close();
?>
