<?php
session_start();
$idUsuarios = $_SESSION['idUsuarios']; // Obtén el id del usuario de la sesión

// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta de ganancias mensuales
$sqlGanancias = "
    SELECT 
        MONTH(fecha_completado) AS mes, 
        SUM(ganancia) AS total_ganancia
    FROM Servicios_CompletadosMOVO
    WHERE id_prestador = $idUsuarios
    GROUP BY mes;
";
$resultGanancias = $conn->query($sqlGanancias);
$gananciasMensuales = [];
while ($row = $resultGanancias->fetch_assoc()) {
    $gananciasMensuales[$row['mes']] = $row['total_ganancia'];
}

// Consulta de pedidos solicitados por mes
$sqlPedidos = "
    SELECT 
        MONTH(fecha_solicitud) AS mes, 
        COUNT(*) AS total_pedidos
    FROM Servicios_SolicitadosMOVO
    WHERE id_prestador = $idUsuarios
    GROUP BY mes;
";
$resultPedidos = $conn->query($sqlPedidos);
$pedidosMensuales = [];
while ($row = $resultPedidos->fetch_assoc()) {
    $pedidosMensuales[$row['mes']] = $row['total_pedidos'];
}

// Consulta de calificación promedio
$sqlCalificacion = "
    SELECT AVG(calificacion) AS promedio_calificacion
    FROM Servicios_CompletadosMOVO
    WHERE id_prestador = $idUsuarios;
";
$resultCalificacion = $conn->query($sqlCalificacion);
$calificacionPromedio = $resultCalificacion->fetch_assoc()['promedio_calificacion'];

// Devuelve los datos al frontend
$data = [
    'ganancias' => $gananciasMensuales,
    'pedidos' => $pedidosMensuales,
    'calificacion' => round($calificacionPromedio, 2)
];

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
