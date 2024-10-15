<?php
// Incluir la conexión
include 'conexion.php';

// Función para insertar una nueva reseña
function insertarResena($usuario, $comentario, $calificacion) {
    global $db; // Usar $db en lugar de $conn
    
    $sql = "INSERT INTO reseñas (usuario, comentario, calificacion, fecha) VALUES (?, ?, ?, CURDATE())";
    
    // Preparar la declaración
    if ($stmt = $db->prepare($sql)) {
        // Asociar los parámetros
        $stmt->bind_param("ssd", $usuario, $comentario, $calificacion);

        // Ejecutar la declaración
        if ($stmt->execute()) {
            $stmt->close(); // Cerrar solo si la ejecución fue exitosa
            return "Reseña agregada con éxito.";
        } else {
            return "Error al agregar reseña: " . $stmt->error;
        }
    } else {
        return "Error en la preparación de la consulta: " . $db->error;
    }
}

// Función para obtener todas las reseñas
function obtenerResenas() {
    global $db; // Usar $db en lugar de $conn
    
    $sql = "SELECT * FROM reseñas ORDER BY fecha DESC";
    $result = $db->query($sql);
    
    return $result;
}

// Función para calcular la calificación promedio
function obtenerPromedioCalificaciones() {
    global $db; // Usar $db en lugar de $conn
    
    $sql = "SELECT AVG(calificacion) AS promedio FROM reseñas";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return number_format($row['promedio'], 1);
    } else {
        return 0;
    }
}

// Función para contar el total de reseñas
function obtenerTotalResenas() {
    global $db; // Usar $db en lugar de $conn
    
    $sql = "SELECT COUNT(*) AS total_reseñas FROM reseñas";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['total_reseñas'];
    } else {
        return 0;
    }
}

// Función para actualizar una reseña
function actualizarResena($id, $comentario, $calificacion) {
    global $db;
    
    $sql = "UPDATE reseñas SET comentario = ?, calificacion = ? WHERE id = ?";
    
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("sdi", $comentario, $calificacion, $id);

        if ($stmt->execute()) {
            $stmt->close();
            return "Reseña actualizada con éxito.";
        } else {
            return "Error al actualizar reseña: " . $stmt->error;
        }
    } else {
        return "Error en la preparación de la consulta: " . $db->error;
    }
}

// Función para eliminar una reseña
function eliminarResena($id) {
    global $db;
    
    $sql = "DELETE FROM reseñas WHERE id = ?";
    
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            $stmt->close();
            return "Reseña eliminada con éxito.";
        } else {
            return "Error al eliminar reseña: " . $stmt->error;
        }
    } else {
        return "Error en la preparación de la consulta: " . $db->error;
    }
}

// Función para filtrar reseñas por calificación
function obtenerResenasPorCalificacion($calificacionMinima) {
    global $db;
    
    $sql = "SELECT * FROM reseñas WHERE calificacion >= ? ORDER BY fecha DESC";
    
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("d", $calificacionMinima);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return $result; // Devuelve el resultado para ser procesado
        } else {
            return "No se encontraron reseñas con esta calificación.";
        }
    } else {
        return "Error en la preparación de la consulta: " . $db->error;
    }
}


?>
