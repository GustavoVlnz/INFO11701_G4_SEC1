<?php
// Incluir archivo de conexión
include 'conexioncontactanos.php';

// Verificar si el formulario ha sido enviado para insertar datos en la base de datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombres = $_POST['name'];
    $apellidos = $_POST['lastname'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $motivo = $_POST['options'];
    $mensaje = $_POST['message'];

    // Consulta SQL para insertar los datos en la tabla "contactos"
    $sql = "INSERT INTO contactosMOVO (nombres, apellidos, email, telefono, motivo, mensaje)
            VALUES (?, ?, ?, ?, ?, ?)";

    // Usar la variable $db del archivo de conexión
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssssss', $nombres, $apellidos, $email, $telefono, $motivo, $mensaje);

    if ($stmt->execute()) {
        echo "El formulario se ha enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el formulario.";
    }
}

// Mostrar todos los mensajes de contacto
if (isset($_POST['ver_mensajes'])) {
    $sql = "SELECT * FROM contactosMOVO ORDER BY fecha_contacto DESC";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        while ($mensaje = $result->fetch_assoc()) {
            echo "<h3>{$mensaje['nombres']} {$mensaje['apellidos']}</h3>";
            echo "<p><strong>Email:</strong> {$mensaje['email']}</p>";
            echo "<p><strong>Teléfono:</strong> {$mensaje['telefono']}</p>";
            echo "<p><strong>Motivo:</strong> {$mensaje['motivo']}</p>";
            echo "<p><strong>Mensaje:</strong> {$mensaje['mensaje']}</p>";
            echo "<hr>";
        }
    } else {
        echo "No hay mensajes para mostrar.";
    }
}

// Buscar mensajes por correo electrónico
if (isset($_POST['buscar_email'])) {
    $emailBusqueda = $_POST['email_busqueda'];
    $sql = "SELECT * FROM contactosMOVO WHERE email = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('s', $emailBusqueda);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($mensaje = $result->fetch_assoc()) {
            echo "<p><strong>Mensaje:</strong> {$mensaje['mensaje']}</p>";
        }
    } else {
        echo "No se encontraron mensajes para este correo.";
    }
}

// Eliminar un mensaje de contacto
if (isset($_POST['eliminar_mensaje'])) {
    $idMensaje = $_POST['id_mensaje'];
    $sql = "DELETE FROM contactosMOVO WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $idMensaje);

    if ($stmt->execute()) {
        echo "El mensaje ha sido eliminado.";
    } else {
        echo "Error al eliminar el mensaje.";
    }
}

// Actualizar datos de contacto
if (isset($_POST['actualizar_mensaje'])) {
    $idMensaje = $_POST['id_mensaje'];
    $nuevoMotivo = $_POST['nuevo_motivo'];
    $nuevoTelefono = $_POST['nuevo_telefono'];

    $sql = "UPDATE contactosMOVO SET motivo = ?, telefono = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssi', $nuevoMotivo, $nuevoTelefono, $idMensaje);

    if ($stmt->execute()) {
        echo "El mensaje ha sido actualizado.";
    } else {
        echo "Error al actualizar el mensaje.";
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($db);

?>
