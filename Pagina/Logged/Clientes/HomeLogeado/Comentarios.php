<?php
<<<<<<< HEAD
// Conexión a la base de datos
$host = 'localhost';
$dbname = 'tu_base_de_datos';
$username = 'tu_usuario';
$password = 'tu_contraseña';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar a la base de datos: " . $e->getMessage());
}

// Verificar si el formulario ha sido enviado para insertar datos en la base de datos
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit_form'])) {
=======
// Incluir archivo de conexión
include 'conexioncontactanos.php';

// Verificar si el formulario ha sido enviado para insertar datos en la base de datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
>>>>>>> Alex
    // Recibir los datos del formulario
    $nombres = $_POST['name'];
    $apellidos = $_POST['lastname'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $motivo = $_POST['options'];
    $mensaje = $_POST['message'];

    // Consulta SQL para insertar los datos en la tabla "contactos"
<<<<<<< HEAD
    $sql = "INSERT INTO contactos (nombres, apellidos, email, telefono, motivo, mensaje)
            VALUES (:nombres, :apellidos, :email, :telefono, :motivo, :mensaje)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombres', $nombres);
    $stmt->bindParam(':apellidos', $apellidos);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':motivo', $motivo);
    $stmt->bindParam(':mensaje', $mensaje);
=======
    $sql = "INSERT INTO contactosMOVO (nombres, apellidos, email, telefono, motivo, mensaje)
            VALUES (?, ?, ?, ?, ?, ?)";

    // Usar la variable $db del archivo de conexión
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssssss', $nombres, $apellidos, $email, $telefono, $motivo, $mensaje);
>>>>>>> Alex

    if ($stmt->execute()) {
        echo "El formulario se ha enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el formulario.";
    }
}

// Mostrar todos los mensajes de contacto
if (isset($_POST['ver_mensajes'])) {
<<<<<<< HEAD
    $sql = "SELECT * FROM contactos ORDER BY fecha_contacto DESC";
    $stmt = $conn->query($sql);
    $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($mensajes as $mensaje) {
        echo "<h3>{$mensaje['nombres']} {$mensaje['apellidos']}</h3>";
        echo "<p><strong>Email:</strong> {$mensaje['email']}</p>";
        echo "<p><strong>Teléfono:</strong> {$mensaje['telefono']}</p>";
        echo "<p><strong>Motivo:</strong> {$mensaje['motivo']}</p>";
        echo "<p><strong>Mensaje:</strong> {$mensaje['mensaje']}</p>";
        echo "<hr>";
=======
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
>>>>>>> Alex
    }
}

// Buscar mensajes por correo electrónico
if (isset($_POST['buscar_email'])) {
    $emailBusqueda = $_POST['email_busqueda'];
<<<<<<< HEAD
    $sql = "SELECT * FROM contactos WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $emailBusqueda);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($resultados) {
        foreach ($resultados as $mensaje) {
=======
    $sql = "SELECT * FROM contactosMOVO WHERE email = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('s', $emailBusqueda);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($mensaje = $result->fetch_assoc()) {
>>>>>>> Alex
            echo "<p><strong>Mensaje:</strong> {$mensaje['mensaje']}</p>";
        }
    } else {
        echo "No se encontraron mensajes para este correo.";
    }
}

// Eliminar un mensaje de contacto
if (isset($_POST['eliminar_mensaje'])) {
    $idMensaje = $_POST['id_mensaje'];
<<<<<<< HEAD
    $sql = "DELETE FROM contactos WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idMensaje);
=======
    $sql = "DELETE FROM contactosMOVO WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $idMensaje);
>>>>>>> Alex

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

<<<<<<< HEAD
    $sql = "UPDATE contactos SET motivo = :nuevoMotivo, telefono = :nuevoTelefono WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nuevoMotivo', $nuevoMotivo);
    $stmt->bindParam(':nuevoTelefono', $nuevoTelefono);
    $stmt->bindParam(':id', $idMensaje);
=======
    $sql = "UPDATE contactosMOVO SET motivo = ?, telefono = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssi', $nuevoMotivo, $nuevoTelefono, $idMensaje);
>>>>>>> Alex

    if ($stmt->execute()) {
        echo "El mensaje ha sido actualizado.";
    } else {
        echo "Error al actualizar el mensaje.";
    }
}
<<<<<<< HEAD
?>
=======

// Cerrar la conexión a la base de datos
mysqli_close($db);

?>
>>>>>>> Alex
