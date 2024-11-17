<?php
// Conexión a la base de datos
include "conexion.inc";
// Consulta de servicios activos
$sql = "SELECT fecha, COUNT(*) AS servicios_activos 
        FROM Proveedor 
        WHERE Verificado = True
        GROUP BY fecha 
        ORDER BY fecha ASC";
$result = $db->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();

