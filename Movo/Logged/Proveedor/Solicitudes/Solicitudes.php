<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
// Conectar a la base de datos usando mysqli
$host = 'db.inf.uct.cl';
$dbname = 'A2024_acarrasco';
$username = 'acarrasco';
$password = 'Hellovro2019@';


// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Consulta para obtener todos los servicios
$query = "SELECT id, cliente, fecha, descripcion, estado FROM SolicitudesMOVO";
$result = $conn->query($query);

$servicios = [];

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Recorrer los resultados y almacenarlos en un array
    while($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
    // Devolver los servicios en formato JSON
    echo json_encode(["success" => true, "data" => $servicios]);
} else {
    echo json_encode(["success" => true, "data" => []]);
}

// Cerrar conexión
$conn->close();
?>
