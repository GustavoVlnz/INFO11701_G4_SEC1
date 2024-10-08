<?php

$servername = "localhost";  
$username = "usuario";
$password = "contraseña";
$dbname = "base_datos";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$correo_actual = $_POST['correo_actual'];
$correo_nuevo = $_POST['correo_nuevo'];


$sql = "UPDATE Usuario SET correo = '$correo_nuevo' WHERE correo = '$correo_actual'";

if ($conn->query($sql) === TRUE) {
    echo "Correo actualizado correctamente.";
} else {
    echo "Error al actualizar el correo: " . $conn->error;
}

$conn->close();
?>
