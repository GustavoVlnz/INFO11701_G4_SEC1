<?php
// Incluimos la conexión a la base de datos
include 'conex.php';

// Verificamos si se recibieron los datos del formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitizamos los datos recibidos para evitar inyecciones SQL
    $idEmpresa = isset($_POST['idEmpresa']) ? intval($_POST['idEmpresa']) : null;
    $fecha_inicial = isset($_POST['fecha_inicial']) ? $_POST['fecha_inicial'] : null;
    $fecha_final = isset($_POST['fecha_final']) ? $_POST['fecha_final'] : null;

    // Validamos que los campos no estén vacíos
    if ($idEmpresa && $fecha_inicial && $fecha_final) {
        // Creamos la consulta para actualizar los horarios
        $sql = "UPDATE empresaMOVO 
                SET fecha_inicial = ?, fecha_final = ? 
                WHERE idEmpresa = ?";

        // Preparamos la consulta
        $stmt = $db->prepare($sql);

        // Verificamos que la preparación sea exitosa
        if ($stmt) {
            // Enlazamos los parámetros
            $stmt->bind_param('ssi', $fecha_inicial, $fecha_final, $idEmpresa);

            // Ejecutamos la consulta
            if ($stmt->execute()) {
                // Redirigimos con un mensaje de éxito
                echo json_encode(["success" => true, "message" => "Horarios actualizados correctamente."]);
            } else {
                // Mensaje de error en caso de fallo en la ejecución
                echo json_encode(["success" => false, "message" => "Error al actualizar los horarios: " . $stmt->error]);
            }

            // Cerramos la consulta
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $db->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

// Cerramos la conexión
$db->close();
?>
