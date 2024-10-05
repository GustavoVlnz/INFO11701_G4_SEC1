<?php
$servername = "localhost";
$username = "usuario";
$password = "contraseña";
$dbname = "movo";

// Crear conexion con la bd
$db = new mysqli($servername, $username, $password, $dbname);

// Verificar conexion
if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}
?>
