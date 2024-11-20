<?php
header('Content-Type: application/json');
include 'conexion.php';
session_start(); // Asegúrate de que la sesión esté iniciada

if (isset($_SESSION['idUsuarios'])) {
    $id_usuario = $_SESSION['idUsuarios'];
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'], $data['nombre_servicio'], $data['descripcion_corta'], $data['descripcion_larga'], $data['id_categoria'], $data['precio_servicio'])) {
        $id_servicio = $data['id'];
        $nombre_servicio = $data['nombre_servicio'];
        $descripcion_corta = $data['descripcion_corta'];
        $descripcion_larga = $data['descripcion_larga'];
        $categoria_id = $data['id_categoria'];
        $precio_servicio = $data['precio_servicio'];

        $query = "UPDATE Lista_ServiciosMOVO SET nombre_servicio = ?, descripcion_corta = ?, descripcion_larga = ?, id_categoria = ?, precio_servicio = ? 
                  WHERE id_servicio = ? AND idUsuario = ?";
        
        if ($stmt = $conexion->prepare($query)) {
            $stmt->bind_param("sssiiii", $nombre_servicio, $descripcion_corta, $descripcion_larga, $categoria_id, $precio_servicio, $id_servicio, $id_usuario);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'No se encontraron cambios o el servicio no existe para este usuario.']);
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
