<?php
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

<<<<<<< HEAD
$db = new mysqli($servername, $username, $password, $dbname);


if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
=======
$conexion = new mysqli($servername, $username, $password, $dbname);


if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
>>>>>>> Alex
}
?>
