<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Conexión a la base de datos (reemplaza los datos de conexión)
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Obtener servicios completados entre un rango de fechas (por ejemplo, año actual)
$fecha_inicio = '2023-01-01';
$fecha_fin = '2023-12-31';
$sql = "SELECT MONTH(fecha_completado) AS mes, COUNT(*) AS cantidad_servicios
        FROM Servicios_CompletadosMOVO
        WHERE fecha_completado BETWEEN '$fecha_inicio' AND '$fecha_fin'
        GROUP BY mes
        ORDER BY mes";

$result = $conn->query($sql);

// Inicializar los arrays para los meses y servicios completados
$meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
$servicios = array_fill(0, 12, 0); // Inicializa todos los meses con 0 servicios

if ($result->num_rows > 0) {
    // Rellenar el array de servicios con los datos obtenidos de la consulta
    while ($row = $result->fetch_assoc()) {
        $mes_index = $row['mes'] - 1; // Restar 1 para alinear con el índice del array (0 = Enero, 1 = Febrero, ...)
        $servicios[$mes_index] = $row['cantidad_servicios'];
    }
}

// Preparar los datos para ser devueltos en formato JSON
$data = [
    'meses' => $meses,
    'servicios' => $servicios
];

echo json_encode($data);

$conn->close();
?>
