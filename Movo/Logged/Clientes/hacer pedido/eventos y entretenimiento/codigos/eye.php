<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$db = new mysqli($servername, $username, $password, $dbname);

if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}

// Consulta a la base de datos
$sql = "SELECT * FROM serviciosMOVO WHERE categoria = 'Eventos y Entretenimiento'";
$result = $db->query($sql);

// Verificar si se obtuvieron resultados
if ($result->num_rows > 0) {
    $servicios = [];
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
    // Enviar datos en formato JSON
    echo json_encode($servicios);
} else {
    echo json_encode([]); // Respuesta vacía si no hay resultados
}

$db->close();
?>
