<?php
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'];

$sql = "SELECT * FROM usuariosMOVO WHERE email = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

echo json_encode(["registrado" => $resultado->num_rows > 0]);
?>
