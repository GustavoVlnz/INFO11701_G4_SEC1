<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Conectar a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Obtener total de servicios completados
$total_servicios_sql = "SELECT COUNT(*) AS total_servicios FROM Servicios_CompletadosMOVO";
$total_servicios_result = $conn->query($total_servicios_sql);
$total_servicios = $total_servicios_result->fetch_assoc()['total_servicios'];

// Obtener el promedio de calificaciones
$calificacion_promedio_sql = "SELECT AVG(calificacion) AS promedio_calificacion FROM Servicios_CompletadosMOVO";
$calificacion_promedio_result = $conn->query($calificacion_promedio_sql);
$promedio_calificacion = round($calificacion_promedio_result->fetch_assoc()['promedio_calificacion'], 1);

// Obtener la cantidad de servicios por tipo
$servicios_mas_solicitados_sql = "
    SELECT servicio_completado, COUNT(*) AS cantidad_servicios 
    FROM Servicios_CompletadosMOVO 
    GROUP BY servicio_completado 
    ORDER BY cantidad_servicios DESC 
    LIMIT 5";
$servicios_mas_solicitados_result = $conn->query($servicios_mas_solicitados_sql);

$servicios_mas_solicitados = [];
while ($row = $servicios_mas_solicitados_result->fetch_assoc()) {
    $servicios_mas_solicitados[] = [
        'servicio' => $row['servicio_completado'],
        'cantidad' => $row['cantidad_servicios']
    ];
}

// Preparar los datos para ser devueltos en formato JSON
$response = [
    'total_servicios' => $total_servicios,
    'promedio_calificacion' => $promedio_calificacion,
    'servicios_mas_solicitados' => $servicios_mas_solicitados
];

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>
