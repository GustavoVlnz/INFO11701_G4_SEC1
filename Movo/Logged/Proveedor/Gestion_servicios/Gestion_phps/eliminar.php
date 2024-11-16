<?php
<<<<<<< HEAD
header('Content-Type: application/json');
include 'conexion.php';

// Decodifica el JSON recibido
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si se ha enviado el ID del servicio
if (isset($data['id'])) {
    $id_servicio = $data['id'];

    // Prepara la consulta SQL para eliminar el servicio
    $query = "DELETE FROM serviciosMOVO WHERE id_servicio = ?";
    
    // Prepara la sentencia
    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("i", $id_servicio); // Vincula el id como entero
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se encontró el servicio a eliminar.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No se recibió el id del servicio.']);
=======
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_servicio = $_POST['id_servicio'];

    // Eliminar el servicio
    $sql = "DELETE FROM Lista_ServiciosMOVO WHERE id_servicio='$id_servicio'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["mensaje" => "Servicio eliminado exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el servicio: " . $conn->error]);
    }

    $conn->close();
>>>>>>> Alex
}
?>
