<?php
// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Log de depuración: Imprimir los datos recibidos
error_log(print_r($_POST, true));  // Esto imprimirá los datos que llegan al servidor

// Validar si los datos requeridos se han enviado mediante POST
if (isset($_POST['id_servicio'], $_POST['nombre_servicio'], $_POST['descripcion_corta'], $_POST['precio_servicio'])) {
    $id_servicio = intval($_POST['id_servicio']);
    $nombre_servicio = trim($_POST['nombre_servicio']);
    $descripcion_corta = trim($_POST['descripcion_corta']);
    $precio_servicio = floatval($_POST['precio_servicio']);

    // Validar que no estén vacíos los campos
    if ($id_servicio > 0 && !empty($nombre_servicio) && !empty($descripcion_corta) && $precio_servicio >= 0) {
        try {
            // Preparar la consulta de actualización
            $query = "UPDATE Lista_ServiciosMOVO 
                      SET nombre_servicio = ?, descripcion_corta = ?, precio_servicio = ? 
                      WHERE id_servicio = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ssdi', $nombre_servicio, $descripcion_corta, $precio_servicio, $id_servicio);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                echo "Servicio actualizado correctamente";
            } else {
                echo "Error al actualizar el servicio: " . $stmt->error;
            }

            // Cerrar la declaración
            $stmt->close();
        } catch (Exception $e) {
            echo "Error en el servidor: " . $e->getMessage();
        }
    } else {
        echo "Error: Todos los campos son obligatorios y deben tener valores válidos.";
    }
} else {
    echo "Error: Datos incompletos enviados.";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
