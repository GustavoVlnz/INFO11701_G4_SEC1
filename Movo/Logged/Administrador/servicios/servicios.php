<?php
// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los servicios
$sql = "SELECT id_servicio, nombre_servicio, descripcion_corta, precio_servicio FROM Lista_ServiciosMOVO";
$result = $conn->query($sql);

$servicios = array();

if ($result->num_rows > 0) {
    // Guardar los datos en un array
    while($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
} else {
    echo json_encode([]); // Devolver array vacío si no hay resultados
}

$conn->close();

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($servicios);
?>
