<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
include 'conexion.php';

// Verificar si el usuario está autenticado
if (!isset($_SESSION['idUsuarios'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado.']);
    exit;
}

$idPrestador = $_SESSION['idUsuarios']; // El id del prestador se obtiene de la sesión

// Consulta para obtener los servicios relacionados con el proveedor autenticado
$query = "
    SELECT 
        ss.id_solicitud, 
        ss.id_solicitante, 
        ss.fecha_solicitud AS fecha, 
        ss.servicio_solicitado AS nombre_servicio, 
        ss.estado_solicitud AS estado 
    FROM Servicios_SolicitadosMOVO AS ss
    WHERE ss.id_prestador = ?
";

$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $idPrestador);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Error al ejecutar la consulta: ' . $stmt->error]);
    exit;
}

$result = $stmt->get_result();

$servicios = [];
if ($result) {
    while ($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
}

echo json_encode(['success' => true, 'data' => $servicios]);

$stmt->close();
$conn->close();
?>
