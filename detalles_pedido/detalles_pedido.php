<?php
// Incluir la conexión
include 'conexionreseñas.php';

// Verificar si el formulario ha sido enviado para insertar datos en la base de datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $usuario = $_POST['usuario'];
    $comentario = $_POST['comentario'];
    $calificacion = $_POST['calificacion'];

    // Consulta SQL para insertar los datos en la tabla
    $sql = "INSERT INTO reseñasMOVO (usuario, comentario, calificacion) VALUES (?, ?, ?)";

    // Usar la variable $db del archivo de conexión
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssd', $usuario, $comentario, $calificacion);

    if ($stmt->execute()) {
        // Generar la salida HTML para la nueva reseña
        echo "<h4>$usuario</h4>";
        echo "<p class='fecha'>" . date('Y-m-d') . "</p>"; // Puedes cambiar el formato de la fecha según lo necesites
        echo "<p class='comentario'>$comentario</p>";
    } else {
        echo "Hubo un error al enviar el formulario: " . $stmt->error; // Mostrar el error
    }
}

// Función para contar el total de reseñas
function obtenerTotalResenas() {
    global $db;
    
    $sql = "SELECT COUNT(*) AS total_reseñas FROM reseñasMOVO";
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
    
    $sql = "UPDATE reseñasMOVO SET comentario = ?, calificacion = ? WHERE id = ?";
    
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
    
    $sql = "DELETE FROM reseñasMOVO WHERE id = ?";
    
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
    
    $sql = "SELECT * FROM reseñasMOVO WHERE calificacion >= ? ORDER BY fecha DESC";
    
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("d", $calificacionMinima);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return $result;
        } else {
            return "No se encontraron reseñas con esta calificación.";
        }
    } else {
        return "Error en la preparación de la consulta: " . $db->error;
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($db);
?>
