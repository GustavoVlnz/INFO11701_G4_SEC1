<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conectar a la base de datos
$host = 'db.inf.uct.cl';
$dbname = 'A2024_acarrasco';
$username = 'acarrasco';
$password = 'Hellovro2019@';

// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar que el usuario está autenticado
if (!isset($_SESSION['idUsuarios'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$idPrestador = $_SESSION['idUsuarios'];

// Decodificar los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $idSolicitud = intval($data['id']);

    // Obtener el id_servicio y el id_solicitante de la tabla SolicitudesMOVO
    $querySolicitud = "SELECT id_servicio, id_solicitante, servicio_solicitado FROM Servicios_SolicitadosMOVO WHERE id_solicitud = ?";
    $stmtSolicitud = $conn->prepare($querySolicitud);
    $stmtSolicitud->bind_param("i", $idSolicitud);
    $stmtSolicitud->execute();
    $resultSolicitud = $stmtSolicitud->get_result();

    if ($resultSolicitud->num_rows > 0) {
        $rowSolicitud = $resultSolicitud->fetch_assoc();
        $idServicio = $rowSolicitud['id_servicio'];
        $idCliente = $rowSolicitud['id_solicitante'];
        $servicioSolicitado = $rowSolicitud['servicio_solicitado'];

        // Obtener la ganancia (precio del servicio) de la tabla Lista_ServiciosMOVO
        $queryGanancia = "SELECT precio_servicio FROM Lista_ServiciosMOVO WHERE id_servicio = ?";
        $stmtGanancia = $conn->prepare($queryGanancia);
        $stmtGanancia->bind_param("i", $idServicio);
        $stmtGanancia->execute();
        $resultGanancia = $stmtGanancia->get_result();

        if ($resultGanancia->num_rows > 0) {
            $rowGanancia = $resultGanancia->fetch_assoc();
            $ganancia = $rowGanancia['precio_servicio'];

            // Insertar en la tabla Servicios_CompletadosMOVO
            $comentado = "no";
            $queryInsert = "INSERT INTO Servicios_CompletadosMOVO (id_servicio, servicio_completado, ganancia, id_cliente, id_prestador, comentado) VALUES (?, ?, ?, ?, ?, ?)";
            $stmtInsert = $conn->prepare($queryInsert);
            $stmtInsert->bind_param("isdiss", $idServicio, $servicioSolicitado, $ganancia, $idCliente, $idPrestador, $comentado);
            if ($stmtInsert->execute()) {
                // Actualizar el estado de la solicitud en SolicitudesMOVO
                $queryUpdate = "UPDATE Servicios_SolicitadosMOVO SET estado_solicitud = 'Finalizado' WHERE id_solicitud = ?";
                $stmtUpdate = $conn->prepare($queryUpdate);
                $stmtUpdate->bind_param("i", $idSolicitud);
                $stmtUpdate->execute();

                echo json_encode(['success' => true, 'message' => 'Solicitud completada exitosamente']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al insertar en Servicios_CompletadosMOVO']);
            }
            $stmtInsert->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'No se encontró el precio del servicio']);
        }
        $stmtGanancia->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la solicitud especificada']);
    }
    $stmtSolicitud->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
}

// Cerrar la conexión
$conn->close();
?>
