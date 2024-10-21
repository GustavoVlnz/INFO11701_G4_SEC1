<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del formulario
    $nombre_servicio = $_POST['nombre_servicio'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];
    $fecha_registrado = date('Y-m-d'); // Fecha actual

    // Insertar en la base de datos
    $sql = "INSERT INTO Lista_ServiciosMOVO (nombre_servicio, id_categoria, estado_servicio, precio_servicio, fecha_registrado)
            VALUES ('$nombre_servicio', '$categoria', 'revision', '$precio', '$fecha_registrado')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["mensaje" => "Servicio agregado exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar el servicio: " . $conn->error]);
    }

    $conn->close();
}
?>
