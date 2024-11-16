<?php
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
}
?>
