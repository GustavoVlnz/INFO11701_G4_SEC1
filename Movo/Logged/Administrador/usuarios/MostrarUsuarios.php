<?php
include 'conex.inc'; // Tu archivo de conexión

$sql = "SELECT idUsuarios, nombres, apellidos, email FROM usuariosMOVO";
$result = $db->query($sql);

$usuarios = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($usuarios);

$db->close();
?>
