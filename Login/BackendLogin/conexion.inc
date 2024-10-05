<?php
$servername = "localhost";
$username = "usuario";
$password = "contraseña";
$dbname = "movo";

$db = new mysqli($servername, $username, $password, $dbname);


if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}
?>
