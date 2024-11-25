<?php
// Conexión a la base de datos
$conn = new mysqli("db.inf.uct.cl", "acarrasco", "Hellovro2019@", "A2024_acarrasco");

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Procesar datos del formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id_completado = $_POST['id_completado']; // Array de IDs de servicios completados
    $calificaciones = $_POST['calificacion']; // Array de calificaciones
    $reseñas = $_POST['reseña']; // Array de reseñas (opcional)

    // Validar que todos los campos tengan la misma cantidad de datos
    if (count($id_completado) === count($calificaciones) && count($id_completado) === count($reseñas)) {
        $errores = [];
        $successCount = 0;

        // Iterar a través de los datos enviados
        for ($i = 0; $i < count($id_completado); $i++) {
            $id = $id_completado[$i];
            $calificacion = $calificaciones[$i];
            $reseña = !empty($reseñas[$i]) ? $reseñas[$i] : null;

            // Actualizar la tabla
            $sql = "UPDATE Servicios_CompletadosMOVO 
                    SET comentado = 'si', calificacion = ?, reseña = ? 
                    WHERE id_completado = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isi", $calificacion, $reseña, $id);

            if ($stmt->execute()) {
                $successCount++;
            } else {
                $errores[] = "Error con el servicio ID $id: " . $stmt->error;
            }
        }

        // Mensaje de éxito o errores
        if ($successCount > 0) {
            echo "$successCount reseñas guardadas exitosamente.";
        }

        if (!empty($errores)) {
            echo "<p>Errores:</p><ul>";
            foreach ($errores as $error) {
                echo "<li>$error</li>";
            }
            echo "</ul>";
        }

        // Redirigir al usuario después de completar el proceso
        header("Location: ../HomeLogeado/home.html");
        exit();
    } else {
        echo "Error: La cantidad de datos enviados no coincide.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>
