<?php
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'];

$sql = "UPDATE usuariosMOVO SET verificacion = 1 WHERE email = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $correo);

if ($stmt->execute()) {
    echo json_encode(["exito" => true]);
} else {
    echo json_encode(["exito" => false]);
}
?>
