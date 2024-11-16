<?php
include 'conexion.php';
<<<<<<< HEAD
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$nombre_servicio = $data['nombre_servicio'];
$descripcion = $data['descripcion'];
$categoria_id = $data['categoria_id'];

$query = "INSERT INTO serviciosMOVO (nombre_servicio, descripcion, estado, id_categoria)
          VALUES ('$nombre_servicio', '$descripcion', 'pendiente', '$categoria_id')";

if ($conexion->query($query) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conexion->error]);
=======

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
>>>>>>> Alex
}
?>
