<?php
header('Content-Type: application/json');
include 'conexion.php';

// Obtener los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos sean válidos
if (isset($data['id']) && isset($data['estado'])) {
    // Preparar la consulta para actualizar el estado del servicio basado en idUsuario
    $stmt = $conn->prepare("UPDATE Servicios_SolicitadosMOVO SET estado = ? WHERE idUsuario = ?");
    $stmt->bind_param("si", $data['estado'], $data['id']); // 'id' ahora es idUsuario

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el estado']);
    }

    // Cerrar la consulta y la conexión
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
}
?>
