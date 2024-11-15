<?php
// Conexión a la base de datos
include "conexion.inc";
// Consulta de pedidos
$sql = "SELECT 
           SUM(CASE WHEN estado = 'completado' THEN 1 ELSE 0 END) AS completados, 
           SUM(CASE WHEN estado = 'en_proceso' THEN 1 ELSE 0 END) AS en_proceso, 
           SUM(CASE WHEN estado = 'no_realizado' THEN 1 ELSE 0 END) AS no_realizados 
        FROM pedidos";
$result = $db->query($sql);

$data = [];

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = ['completados' => 0, 'en_proceso' => 0, 'no_realizados' => 0];
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();

