<?php
//datos a completar
$servername = "localhost";
$username = "root"; // usuario de MariaDB
$password = ""; // contraseña MariaDB
$dbname = "sistema_usuarios";

// crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);

// verificacion de la conexion
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}

// verifica si se envia el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $rut = $_POST['rut'];
    $genero = $_POST['genero'];
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];
    $tipo_usuario = $_POST['tipo_usuario'];

    // Encriptar la contraseña antes de guardarla en la base de datos
    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO usuarios (nombre, apellido, rut, genero, email, contrasena, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Preparar la declaración
    $stmt = $conn->prepare($sql);

    // Vincular los parámetros
    $stmt->bind_param("sssssss", $nombre, $apellido, $rut, $genero, $email, $contrasena_hash, $tipo_usuario);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "Registro exitoso";
    } else {
        echo "Error: " . $stmt->error;
    }

    // cierra la conexion
    $stmt->close();
    $conn->close();
}
?>
