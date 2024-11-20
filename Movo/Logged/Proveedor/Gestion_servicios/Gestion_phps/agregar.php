<?php
include 'conexion.php';
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

try {
    // Verificar que el usuario esté autenticado
    if (!isset($_SESSION['idUsuarios'])) {
        throw new Exception('Usuario no autenticado.');
    }

    $id_usuario = $_SESSION['idUsuarios'];

    // Realizar la consulta para obtener el nombre del proveedor
    $query_proveedor = "SELECT nombres FROM usuariosMOVO WHERE idUsuarios = ?";
    if ($stmt_proveedor = $conexion->prepare($query_proveedor)) {
        $stmt_proveedor->bind_param("i", $id_usuario);
        $stmt_proveedor->execute();
        $stmt_proveedor->bind_result($nombre);
        if ($stmt_proveedor->fetch()) {
            $nombre_proveedor = trim($nombre);
        } else {
            throw new Exception('No se encontró el proveedor correspondiente.');
        }
        $stmt_proveedor->close();
    } else {
        throw new Exception('Error al preparar la consulta para obtener el nombre del proveedor.');
    }

    // Leer y decodificar la entrada JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    // Validar que los datos estén presentes
    $nombre_servicio = isset($data['nombre_servicio']) ? trim($data['nombre_servicio']) : null;
    $descripcion_corta = isset($data['descripcion_corta']) ? trim($data['descripcion_corta']) : null;
    $descripcion_larga = isset($data['descripcion_larga']) ? trim($data['descripcion_larga']) : null;
    $categoria_id = isset($data['id_categoria']) ? (int)$data['id_categoria'] : null;
    $precio_servicio = isset($data['precio_servicio']) ? (float)$data['precio_servicio'] : null;

    if (!$nombre_servicio || !$descripcion_corta || !$descripcion_larga || !$categoria_id || $precio_servicio === null || $precio_servicio < 0) {
        throw new Exception('Datos incompletos o inválidos.');
    }

    // Insertar el servicio en la base de datos
    $estado_servicio = 'en revisión';
    $query = "INSERT INTO Lista_ServiciosMOVO (nombre_servicio, descripcion_corta, descripcion_larga, id_categoria, precio_servicio, estado_servicio, proveedor_nombre, idUsuario, id_proveedor)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conexion->prepare($query)) {
        $id_proveedor = $id_usuario;
        $stmt->bind_param("sssidsisi", $nombre_servicio, $descripcion_corta, $descripcion_larga, $categoria_id, $precio_servicio, $estado_servicio, $nombre_proveedor, $id_usuario, $id_proveedor);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Servicio agregado exitosamente.', 'nombre_proveedor' => $nombre_proveedor]);
        } else {
            throw new Exception('Error al insertar el servicio: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        throw new Exception('Error en la preparación de la consulta de inserción.');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
