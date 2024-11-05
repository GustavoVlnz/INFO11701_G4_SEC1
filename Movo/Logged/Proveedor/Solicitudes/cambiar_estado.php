<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Decodificar los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos sean válidos
if (isset($data['id']) && isset($data['estado'])) {
    // Conectar a la base de datos usando mysqli
    $host = 'db.inf.uct.cl';
    $dbname = 'A2024_acarrasco';
    $username = 'acarrasco';
    $password = 'Hellovro2019@';

    // Crear conexión
    $conn = new mysqli($host, $username, $password, $dbname);

    // Preparar la consulta SQL para actualizar el estado del servicio
    $stmt = $conn->prepare("UPDATE SolicitudesMOVO SET estado = ? WHERE id = ?");
    $stmt->bind_param("si", $data['estado'], $data['id']);

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
