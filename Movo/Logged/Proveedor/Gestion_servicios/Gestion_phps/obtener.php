<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
include 'conexion.php';
session_start(); // Asegúrate de que la sesión esté iniciada

if (isset($_SESSION['idUsuarios'])) {
    $id_usuario = $_SESSION['idUsuarios'];

    $query = "SELECT id_servicio, nombre_servicio, descripcion_corta, descripcion_larga, id_categoria, precio_servicio, estado_servicio, fecha_registrado 
              FROM Lista_ServiciosMOVO WHERE idUsuario = ?";
    
    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("i", $id_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $servicios = array();
        while ($fila = $resultado->fetch_assoc()) {
            $servicios[] = $fila;
        }

        echo json_encode($servicios);
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado.']);
}
?>
