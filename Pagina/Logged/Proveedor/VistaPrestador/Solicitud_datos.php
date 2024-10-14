<?php
include 'conexion.php'; // Conexión a la base de datos

header('Content-Type: application/json'); // Definir el contenido como JSON

// Inicializar un array para almacenar los resultados
$response = [];

// 1. Consulta para obtener el total de pedidos hechos
$sql_pedidos = "SELECT COUNT(*) as total_pedidos FROM ProveedorMOVO WHERE tipo = 'pedido'";
$result_pedidos = $db->query($sql_pedidos);
if ($result_pedidos->num_rows > 0) {
    $row_pedidos = $result_pedidos->fetch_assoc();
    $response['total_pedidos'] = $row_pedidos['total_pedidos'];
} else {
    $response['total_pedidos'] = 0;
}

// 2. Consulta para obtener ingresos generados
$sql_ingresos = "SELECT SUM(total) as ingresos_totales FROM ProveedorMOVO WHERE tipo = 'pedido'";
$result_ingresos = $db->query($sql_ingresos);
if ($result_ingresos->num_rows > 0) {
    $row_ingresos = $result_ingresos->fetch_assoc();
    $response['ingresos_totales'] = $row_ingresos['ingresos_totales'];
} else {
    $response['ingresos_totales'] = 0;
}

// 3. Consulta para obtener calificaciones promedio
$sql_calificaciones = "SELECT producto, AVG(calificacion) as promedio_calificacion FROM ProveedorMOVO WHERE tipo = 'calificacion' GROUP BY producto";
$result_calificaciones = $db->query($sql_calificaciones);
$calificaciones = [];
if ($result_calificaciones->num_rows > 0) {
    while ($row_calificaciones = $result_calificaciones->fetch_assoc()) {
        $calificaciones[] = [
            'producto' => $row_calificaciones['producto'],
            'promedio_calificacion' => $row_calificaciones['promedio_calificacion']
        ];
    }
    $response['calificaciones'] = $calificaciones;
} else {
    $response['calificaciones'] = [];
}

// Devolver la respuesta como JSON
echo json_encode($response);

// Cerrar la conexión
$db->close();
?>
