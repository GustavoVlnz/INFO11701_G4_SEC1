<?php
include "conex.php"; 

try {
    // Consultas principales
    $usuariosStmt = $conn->query("SELECT COUNT(*) AS usuariosRegistrados FROM usuariosMOVO");
    $serviciosStmt = $conn->query("SELECT COUNT(*) AS serviciosActivos FROM Lista_ServiciosMOVO WHERE estado = 'Activo'");
    $pedidosStmt = $conn->query("SELECT COUNT(*) AS pedidosPendientes FROM Servicios_SolicitadosMOVO WHERE estado = 'pendiente'");

    // Últimos 5 pedidos
    $ultimosPedidosStmt = $conn->query("SELECT id_servicio, cliente, servicio_solicitado, estado, fecha_solicitud FROM Servicios_SolicitadosMOVO ORDER BY fecha_solicitud DESC LIMIT 5");

    // Solicitudes de servicios
    $solicitudesStmt = $conn->query("SELECT proveedor, servicio, reseñas, ganancia FROM Servicios_CompletadosMOVO");

    // Reportes de usuarios
    $reportesStmt = $conn->query("SELECT usuario, servicio, descripcion, estado FROM reportes_usuarios");

    // Resultados en un arreglo
    $result = [
        'usuariosRegistrados' => $usuariosResult->fetch_assoc()['usuariosRegistrados'],
        'serviciosActivos' => $serviciosResult->fetch_assoc()['serviciosActivos'],
        'pedidosPendientes' => $pedidosResult->fetch_assoc()['pedidosPendientes'],
        'ultimosPedidos' => $ultimosPedidosResult->fetch_all(MYSQLI_ASSOC),
        'solicitudesServicios' => $solicitudesResult->fetch_all(MYSQLI_ASSOC),
        'reportesUsuarios' => $reportesResult->fetch_all(MYSQLI_ASSOC),
    ];

    // Devuelve los datos en formato JSON
    echo json_encode($result);
} catch (Exception $e) {
    // Devuelve el error en formato JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
