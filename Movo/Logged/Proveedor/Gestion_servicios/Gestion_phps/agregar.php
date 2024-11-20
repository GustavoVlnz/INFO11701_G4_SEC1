<?php
include 'conexion.php'; // Asegúrate de que este archivo establece la conexión correctamente
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

$response = ['success' => false];

try {
    // Verificar si el usuario está autenticado
    if (!isset($_SESSION['idUsuarios'])) {
        throw new Exception('Usuario no autenticado. Por favor, inicie sesión.');
    }

    $id_usuario = $_SESSION['idUsuarios'];

    // Obtener el nombre del proveedor basado en el ID del usuario
    $query_proveedor = "SELECT nombres FROM usuariosMOVO WHERE idUsuarios = ?";
    $stmt_proveedor = $conexion->prepare($query_proveedor);
    if (!$stmt_proveedor) {
        throw new Exception('Error al preparar la consulta para obtener el nombre del proveedor: ' . $conexion->error);
    }

    $stmt_proveedor->bind_param("i", $id_usuario);
    if (!$stmt_proveedor->execute()) {
        throw new Exception('Error al ejecutar la consulta para obtener el proveedor: ' . $stmt_proveedor->error);
    }

    $stmt_proveedor->bind_result($nombre);
    if (!$stmt_proveedor->fetch()) {
        throw new Exception('No se encontró un proveedor con el ID proporcionado.');
    }
    $nombre_proveedor = trim($nombre);
    $stmt_proveedor->close();

    // Leer y decodificar los datos JSON
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        throw new Exception('No se recibió un JSON válido.');
    }

    // Validar los datos recibidos
    $nombre_servicio = isset($data['nombre_servicio']) ? trim($data['nombre_servicio']) : null;
    $descripcion_corta = isset($data['descripcion_corta']) ? trim($data['descripcion_corta']) : null;
    $descripcion_larga = isset($data['descripcion_larga']) ? trim($data['descripcion_larga']) : null;
    $categoria_id = isset($data['id_categoria']) ? (int)$data['id_categoria'] : null;
    $precio_servicio = isset($data['precio_servicio']) ? (float)$data['precio_servicio'] : null;

    if (!$nombre_servicio || !$descripcion_corta || !$descripcion_larga || !$categoria_id || $precio_servicio === null || $precio_servicio < 0) {
        throw new Exception('Datos incompletos o inválidos. Por favor, revise los campos ingresados.');
    }

    // Insertar los datos en la base de datos
    $estado_servicio = 'en revisión';
    $query_insert = "
        INSERT INTO Lista_ServiciosMOVO 
        (nombre_servicio, descripcion_corta, descripcion_larga, id_categoria, precio_servicio, estado_servicio, proveedor_nombre, idUsuario, id_proveedor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $stmt_insert = $conexion->prepare($query_insert);
    if (!$stmt_insert) {
        throw new Exception('Error al preparar la consulta de inserción: ' . $conexion->error);
    }

    $stmt_insert->bind_param(
        "sssidssii",
        $nombre_servicio,
        $descripcion_corta,
        $descripcion_larga,
        $categoria_id,
        $precio_servicio,
        $estado_servicio,
        $nombre_proveedor,
        $id_usuario,
        $id_usuario
    );

    if (!$stmt_insert->execute()) {
        throw new Exception('Error al insertar el servicio: ' . $stmt_insert->error);
    }

    $stmt_insert->close();

    // Respuesta de éxito
    $response['success'] = true;
    $response['message'] = 'Servicio agregado exitosamente.';
    $response['nombre_proveedor'] = $nombre_proveedor;

} catch (Exception $e) {
    // Capturar cualquier error y enviarlo en la respuesta
    $response['error'] = $e->getMessage();
    error_log('Error: ' . $e->getMessage());
} finally {
    // Enviar la respuesta en formato JSON
    echo json_encode($response);
}
?>