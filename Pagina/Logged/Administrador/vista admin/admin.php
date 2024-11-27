<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir el archivo de conexión
include "conex.php"; // Asegúrate de que el nombre y la ruta sean correctos

// Configurar el encabezado para devolver JSON
header('Content-Type: application/json');

// Inicializar variables
$usuariosRegistrados = 0;
$serviciosCompletados = 0;
$serviciosPendientes = 0;

try {
    // Verificar si la conexión es exitosa
    if ($conn->connect_error) {
        throw new Exception('Error de conexión a la base de datos: ' . $conn->connect_error);
    }

    // Contar usuarios registrados
    $result = $conn->query("SELECT COUNT(*) AS total FROM usuariosMOVO");
    if ($result) {
        $row = $result->fetch_assoc();
        $usuariosRegistrados = $row['total'];
    } else {
        throw new Exception('Error al obtener usuarios registrados: ' . $conn->error);
    }

    // Contar servicios completados
    $result = $conn->query("SELECT COUNT(*) AS total FROM Servicios_CompletadosMOVO");
    if ($result) {
        $row = $result->fetch_assoc();
        $serviciosCompletados = $row['total'];
    } else {
        throw new Exception('Error al obtener servicios completados: ' . $conn->error);
    }

    // Contar servicios pendientes
    $result = $conn->query("SELECT COUNT(*) AS total FROM Lista_ServiciosMOVO WHERE estado_servicio = 'en revision'");
    if ($result) {
        $row = $result->fetch_assoc();
        $serviciosPendientes = $row['total'];
    } else {
        throw new Exception('Error al obtener servicios pendientes: ' . $conn->error);
    }

    // Devolver los resultados como JSON
    echo json_encode([
        'usuariosRegistrados' => $usuariosRegistrados,
        'serviciosCompletados' => $serviciosCompletados,
        'serviciosPendientes' => $serviciosPendientes,
    ]);
} catch (Exception $e) {
    // Devolver un mensaje de error en formato JSON
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Cerrar la conexión si fue abierta
    if (isset($conn) && $conn->ping()) {
        $conn->close();
    }
}
?>
