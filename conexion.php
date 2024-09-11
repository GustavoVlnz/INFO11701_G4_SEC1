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

// erificar siv se envio el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // obtiene los datos ingresados en el formulario
    $nombre_usuario = $_POST['nombre_usuario'];
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    // encriptar la contraseña antes de guardarla en la base de datos
    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);

    // consulta para ingresar datos
    $sql = "INSERT INTO usuarios (nombre_usuario, email, contrasena) VALUES (?, ?, ?)";

    // prepara la declaracion
    $stmt = $conn->prepare($sql);

    // vincula los parametros
    $stmt->bind_param("sss", $nombre_usuario, $email, $contrasena_hash);

    // ejecuta la consukta
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
