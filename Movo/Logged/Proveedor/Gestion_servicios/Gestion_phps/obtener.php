<?php
session_start(); // Iniciar sesión
header('Content-Type: application/json');
include 'conexion.php'; // Conexión a la base de datos

// Verificar si el usuario está autenticado
if (!isset($_SESSION['idUsuarios'])) {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit;
}

// Obtener el ID del usuario desde la sesión
$id_prestador = $_SESSION['idUsuarios'];

// Consultar los servicios del usuario autenticado
$query = $conexion->prepare("SELECT * FROM Lista_ServiciosMOVO WHERE id_prestador = ?");
$query->bind_param("i", $id_prestador);
$query->execute();
$result = $query->get_result();

$servicios = [];
while ($row = $result->fetch_assoc()) {
    $servicios[] = $row;
}

echo json_encode($servicios);
?>
