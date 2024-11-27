<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Consulta para obtener las ganancias por servicio
$sql = "SELECT servicio_completado, SUM(ganancia) AS total_ganancia
        FROM Servicios_CompletadosMOVO

        GROUP BY servicio_completado
        ORDER BY total_ganancia DESC";

$result = $conn->query($sql);

// Inicializar arrays para los servicios y las ganancias
$servicios = [];
$ganancias = [];

// Verificar si hay filas en el resultado
if ($result->num_rows > 0) {
    // Rellenar los arrays con los datos obtenidos
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row['servicio_completado'];
        $ganancias[] = $row['total_ganancia'];
    }
} else {
    // Si no hay resultados, mostrar un mensaje adecuado
    die(json_encode(['error' => 'No se encontraron servicios completados']));
}

// Preparar los datos para ser devueltos en formato JSON
$data = [
    'servicios' => $servicios,
    'ganancias' => $ganancias
];

echo json_encode($data);

$conn->close();
?>
