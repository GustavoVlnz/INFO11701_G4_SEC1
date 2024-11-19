<?php
// Conexión a la base de datos
include "conexion.inc";

// Consulta para obtener los géneros de los usuarios
$sql = "SELECT 
           SUM(CASE WHEN genero = 'Masculino' THEN 1 ELSE 0 END) AS Masculino,
           SUM(CASE WHEN genero = 'Femenino' THEN 1 ELSE 0 END) AS Femenino,
           SUM(CASE WHEN genero = 'Otro' THEN 1 ELSE 0 END) AS Otro,
           SUM(CASE WHEN genero = 'Prefiero no decirlo' THEN 1 ELSE 0 END) AS PrefieroNoDecirlo
        FROM usuariosMOVO";

$result = $db->query($sql);

$data = [];

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = [
        'Masculino' => 0,
        'Femenino' => 0,
        'Otro' => 0,
        'PrefieroNoDecirlo' => 0
    ];
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();
?>
