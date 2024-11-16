<?php
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
}
?>
