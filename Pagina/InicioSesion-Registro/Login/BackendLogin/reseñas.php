<?php
session_start(); // Asegura que la sesión está iniciada
include 'conexion.php'; // Conectar a la base de datos

header('Content-Type: application/json');

// Verificar si el usuario está autenticado
if (isset($_SESSION['idUsuarios'])) {
    $idUsuario = $_SESSION['idUsuarios'];

    // Consulta para verificar si hay servicios con 'comentado' = 'no'
    $query = "SELECT id_completado FROM Servicios_CompletadosMOVO WHERE id_cliente = ? AND comentado = 'no'";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['hasPendingReviews' => true]);
    } else {
        echo json_encode(['hasPendingReviews' => false]);
    }

    $stmt->close();
    $conexion->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado.']);
}
?>
