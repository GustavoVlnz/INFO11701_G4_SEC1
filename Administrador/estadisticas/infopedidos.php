<?php
// Conexión a la base de datos
include "conexion.inc";

// Consulta para obtener la cantidad de servicios solicitados y completados
$sql = "SELECT 
            (SELECT COUNT(*) FROM Servicios_SolicitadosMOVO) AS Solicitados,
            (SELECT COUNT(*) FROM Servicios_CompletadosMOVO) AS Completados";

$result = $db->query($sql);
$data = [];

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = ['Solicitados' => 0, 'Completados' => 0];
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();
?>

