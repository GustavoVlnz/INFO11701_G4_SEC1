<?php
// Conexión a la base de datos
include "conexion.inc";

// Consulta para contar usuarios por rol
$sql = "SELECT 
            SUM(CASE WHEN rol = 'empresa' THEN 1 ELSE 0 END) AS empresa,
            SUM(CASE WHEN rol = 'cliente' THEN 1 ELSE 0 END) AS cliente
        FROM usuariosMOVO";

$result = $db->query($sql);

// Inicializar los datos
$data = ['empresa' => 0, 'cliente' => 0];

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
}

// Enviar los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$db->close();
?>
