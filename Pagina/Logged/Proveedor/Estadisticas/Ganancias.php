<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

<<<<<<< HEAD
// Consulta para obtener las ganancias por servicio
$sql = "SELECT servicio_completado, SUM(ganancia) AS total_ganancia
        FROM CompletadosMOVO
=======
// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Consulta para obtener las ganancias por servicio
$sql = "SELECT servicio_completado, SUM(ganancia) AS total_ganancia
        FROM Servicios_CompletadosMOVO
>>>>>>> Alex
        GROUP BY servicio_completado
        ORDER BY total_ganancia DESC";

$result = $conn->query($sql);

<<<<<<< HEAD
=======
// Verificar si la consulta devolvió resultados
if ($result === false) {
    die(json_encode(['error' => 'Error en la consulta SQL: ' . $conn->error]));
}

>>>>>>> Alex
// Inicializar arrays para los servicios y las ganancias
$servicios = [];
$ganancias = [];

<<<<<<< HEAD
=======
// Verificar si hay filas en el resultado
>>>>>>> Alex
if ($result->num_rows > 0) {
    // Rellenar los arrays con los datos obtenidos
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row['servicio_completado'];
        $ganancias[] = $row['total_ganancia'];
    }
<<<<<<< HEAD
=======
} else {
    // Si no hay resultados, mostrar un mensaje adecuado
    die(json_encode(['error' => 'No se encontraron servicios completados']));
>>>>>>> Alex
}

// Preparar los datos para ser devueltos en formato JSON
$data = [
    'servicios' => $servicios,
    'ganancias' => $ganancias
];

echo json_encode($data);

$conn->close();
?>
