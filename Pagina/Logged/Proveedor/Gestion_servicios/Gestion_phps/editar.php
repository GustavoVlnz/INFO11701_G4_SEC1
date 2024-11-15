<?php
<<<<<<< HEAD
header('Content-Type: application/json');
include 'conexion.php';

// Decodifica el JSON recibido
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si se enviaron los datos requeridos
if (isset($data['id'], $data['nombre_servicio'], $data['descripcion'], $data['id_categoria'])) {
    $id_servicio = $data['id'];
    $nombre_servicio = $data['nombre_servicio'];
    $descripcion = $data['descripcion'];
    $categoria_id = $data['id_categoria'];

    // Prepara la consulta SQL para actualizar el servicio
    $query = "UPDATE serviciosMOVO SET nombre_servicio = ?, descripcion = ?, id_categoria = ? WHERE id_servicio = ?";
    
    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("ssii", $nombre_servicio, $descripcion, $categoria_id, $id_servicio);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se encontraron cambios o el servicio no existe.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos.']);
=======
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_servicio = $_POST['id_servicio'];
    $nombre_servicio = $_POST['nombre_servicio'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];

    // Actualizar los datos del servicio
    $sql = "UPDATE Lista_ServiciosMOVO 
            SET nombre_servicio='$nombre_servicio', id_categoria='$categoria', 
                precio_servicio='$precio'
            WHERE id_servicio='$id_servicio'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["mensaje" => "Servicio actualizado exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el servicio: " . $conn->error]);
    }

    $conn->close();
>>>>>>> Alex
}
?>
