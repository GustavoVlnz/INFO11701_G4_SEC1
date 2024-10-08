<?php

$servername = "localhost";  
$username = "usuario";
$password = "contraseña";
$dbname = "movo";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


$telefono_actual = $_POST['Numero_actual'];
$telefono_nuevo = $_POST['Numero_nuevo'];

$sql = "UPDATE Usuario SET telefono = '$telefono_nuevo' WHERE telefono = '$telefono_actual'";

if ($conn->query($sql) === TRUE) {
    echo "Número actualizado correctamente.";
} else {
    echo "Error al actualizar el número: " . $conn->error;
}


$conn->close();
?>
