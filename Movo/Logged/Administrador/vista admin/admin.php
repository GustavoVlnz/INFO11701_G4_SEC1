<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir el archivo de conexión
include "conex.php"; // Asegúrate de que el nombre y la ruta sean correctos

header('Content-Type: application/json');

// Inicializar variables
$usuariosRegistrados = 0;
$serviciosActivos = 0;
$serviciosPendientes = 0;

try {
    // Contar usuarios registrados
    $result = $conn->query("SELECT COUNT(*) AS total FROM usuariosMOVO"); // Cambia 'usuarios' según tu tabla
    if ($result) {
        $row = $result->fetch_assoc();
        $usuariosRegistrados = $row['total'];
    }

    // Contar servicios activos
    $result = $conn->query("SELECT COUNT(*) AS total FROM serviciosMOVO WHERE estado = 'activo'"); // Cambia 'serviciosMOVO' según tu tabla
    if ($result) {
        $row = $result->fetch_assoc();
        $serviciosActivos = $row['total'];
    }

    // Contar servicios pendientes
    $result = $conn->query("SELECT COUNT(*) AS total FROM serviciosMOVO WHERE estado = 'pendiente'"); // Cambia 'serviciosMOVO' según tu tabla
    if ($result) {
        $row = $result->fetch_assoc();
        $serviciosPendientes = $row['total'];
    }

    // Devolver los resultados como JSON
    echo json_encode([
        'usuariosRegistrados' => $usuariosRegistrados,
        'serviciosActivos' => $serviciosActivos,
        'serviciosPendientes' => $serviciosPendientes,
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

// Cerrar la conexión
$conn->close();
?>
