<?php
include "conex.php"; 

try {
    // Consultas principales
    $usuariosStmt = $conn->query("SELECT COUNT(*) AS usuariosRegistrados FROM usuariosMOVO");
    $serviciosStmt = $conn->query("SELECT COUNT(*) AS serviciosActivos FROM servicios WHERE estado = 'activo'");
    $pedidosStmt = $conn->query("SELECT COUNT(*) AS pedidosPendientes FROM pedidos WHERE estado = 'pendiente'");

    // Últimos 5 pedidos
    $ultimosPedidosStmt = $conn->query("SELECT id_servicio, cliente, servicio_solicitado, estado, fecha_solicitud FROM Servicios_SolicitadosMOVO ORDER BY fecha_solicitud DESC LIMIT 5");

    // Solicitudes de servicios
    $solicitudesStmt = $conn->query("SELECT proveedor, servicio, reseñas, ganancia FROM Servicios_CompletadosMOVO");

    // Reportes de usuarios
    $reportesStmt = $conn->query("SELECT usuario, servicio, descripcion, estado FROM reportes_usuarios");

    // Resultados en un arreglo
    $result = [
        'usuariosRegistrados' => $usuariosStmt->fetch(PDO::FETCH_ASSOC)['usuariosRegistrados'],
        'serviciosActivos' => $serviciosStmt->fetch(PDO::FETCH_ASSOC)['serviciosActivos'],
        'pedidosPendientes' => $pedidosStmt->fetch(PDO::FETCH_ASSOC)['pedidosPendientes'],
        'ultimosPedidos' => $ultimosPedidosStmt->fetchAll(PDO::FETCH_ASSOC),
        'solicitudesServicios' => $solicitudesStmt->fetchAll(PDO::FETCH_ASSOC),
        'reportesUsuarios' => $reportesStmt->fetchAll(PDO::FETCH_ASSOC),
    ];

    // Devuelve los datos en formato JSON
    echo json_encode($result);
} catch (PDOException $e) {
    // Devuelve el error en formato JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
