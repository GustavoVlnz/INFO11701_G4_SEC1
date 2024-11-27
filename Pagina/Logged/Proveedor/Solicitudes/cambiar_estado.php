<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de conexión a la base de datos
$host = 'db.inf.uct.cl';
$dbname = 'A2024_acarrasco';
$username = 'acarrasco';
$password = 'Hellovro2019@';

// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Conexión fallida: " . $conn->connect_error]));
}

// Verificar autenticación del usuario
if (!isset($_SESSION['idUsuarios'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$idPrestador = $_SESSION['idUsuarios'];
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

$idSolicitud = intval($data['id']);

// Obtener datos de la solicitud
$querySolicitud = "SELECT id_servicio, id_solicitante, servicio_solicitado FROM Servicios_SolicitadosMOVO WHERE id_solicitud = ?";
$stmtSolicitud = $conn->prepare($querySolicitud);
$stmtSolicitud->bind_param("i", $idSolicitud);
$stmtSolicitud->execute();
$resultSolicitud = $stmtSolicitud->get_result();

if ($resultSolicitud->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'No se encontró la solicitud especificada']);
    exit;
}

$rowSolicitud = $resultSolicitud->fetch_assoc();
$idServicio = $rowSolicitud['id_servicio'];
$idCliente = $rowSolicitud['id_solicitante'];
$servicioSolicitado = $rowSolicitud['servicio_solicitado'];

$stmtSolicitud->close();

// Obtener el precio del servicio
$queryGanancia = "SELECT precio_servicio FROM Lista_ServiciosMOVO WHERE id_servicio = ?";
$stmtGanancia = $conn->prepare($queryGanancia);
$stmtGanancia->bind_param("i", $idServicio);
$stmtGanancia->execute();
$resultGanancia = $stmtGanancia->get_result();

if ($resultGanancia->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'No se encontró el precio del servicio']);
    exit;
}

$ganancia = $resultGanancia->fetch_assoc()['precio_servicio'];
$stmtGanancia->close();

// Insertar en Servicios_CompletadosMOVO
$queryInsert = "INSERT INTO Servicios_CompletadosMOVO (id_servicio, servicio_completado, ganancia, id_cliente, id_prestador, comentado) 
                VALUES (?, ?, ?, ?, ?, 'no')";
$stmtInsert = $conn->prepare($queryInsert);
$stmtInsert->bind_param("isdii", $idServicio, $servicioSolicitado, $ganancia, $idCliente, $idPrestador);

if (!$stmtInsert->execute()) {
    echo json_encode(['success' => false, 'message' => 'Error al insertar en Servicios_CompletadosMOVO']);
    exit;
}
$stmtInsert->close();

// Actualizar el estado de la solicitud
$queryUpdate = "UPDATE Servicios_SolicitadosMOVO SET estado_solicitud = 'Finalizado' WHERE id_solicitud = ?";
$stmtUpdate = $conn->prepare($queryUpdate);
$stmtUpdate->bind_param("i", $idSolicitud);
$stmtUpdate->execute();
$stmtUpdate->close();

echo json_encode(['success' => true, 'message' => 'Solicitud completada exitosamente']);

// Cerrar la conexión
$conn->close();
?>
