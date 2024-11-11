<?php
session_start();
include 'conexion.inc';

if (!isset($_SESSION['IDuser'])) {
    echo "Error: Sesión no iniciada.";
    exit();
}

$user_id = $_SESSION['IDuser'];

// Obtener datos del formulario
$nombre = $_POST['nombres'];
$apellido = $_POST['apellidos'];
$genero = $_POST['genero'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];

// Preparar la consulta de actualización
$sql = "UPDATE usuariosMOVO SET nombres = ?, apellidos = ?, genero = ?, email = ?, direccion = ?, telefono = ? WHERE idUsuarios = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("ssssssi", $nombre, $apellido, $genero, $email, $direccion, $telefono, $user_id);

if ($stmt->execute()) {
    echo "Perfil actualizado con éxito.";
} else {
    echo "Error al actualizar el perfil.";
}

$stmt->close();
$db->close();
?>
