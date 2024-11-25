<?php
// Conexión a la base de datos
include "conexion.inc";
// Consulta para obtener los géneros de los usuarios
$sql = "SELECT 
           SUM(CASE WHEN Genero = 'Masculino' THEN 1 ELSE 0 END) AS Masculino,
           SUM(CASE WHEN Genero = 'Femenino' THEN 1 ELSE 0 END) AS Femenino,
           SUM(CASE WHEN Genero = 'Otro' THEN 1 ELSE 0 END) AS Otro
        FROM Usuario";
        
$result = $db->query($sql);

$data = [];

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = ['Masculino' => 0, 'Femenino' => 0, 'Otro' => 0];
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();

