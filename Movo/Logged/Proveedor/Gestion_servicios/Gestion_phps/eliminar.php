<?php
header('Content-Type: application/json');
include 'conexion.php';
session_start(); // Asegúrate de que la sesión esté iniciada

if (isset($_SESSION['idUsuarios'])) {
    $id_usuario = $_SESSION['idUsuarios'];
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $id_servicio = $data['id'];
        $query = "DELETE FROM Lista_ServiciosMOVO WHERE id_servicio = ? AND idUsuario = ?";
        if ($stmt = $conexion->prepare($query)) {
            $stmt->bind_param("ii", $id_servicio, $id_usuario);
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'No se encontró el servicio para este usuario o no existe.']);
            }

            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado.']);
}
?>
