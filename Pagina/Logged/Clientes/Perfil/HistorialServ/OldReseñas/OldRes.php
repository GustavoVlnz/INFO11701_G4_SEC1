<?php

include 'conexion.php'; 

session_start();
$IDuser = $_SESSION['idUsuarios']; 

// Consulta para obtener las reseñas del usuario
$sql = "SELECT servicio_completado, fecha_completado, calificacion, reseñas FROM Servicios_CompletadosMOVO WHERE cliente = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $IDuser);
$stmt->execute();
$resultado = $stmt->get_result();

$reseñas = [];
while ($fila = $resultado->fetch_assoc()) {
    $reseñas[] = $fila;
}

// Enviar la respuesta en formato JSON
echo json_encode($reseñas);

$stmt->close();
$db->close();
?>
