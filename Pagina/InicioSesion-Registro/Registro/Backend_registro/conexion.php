<?php
<<<<<<< HEAD
$servername = "db.inf.uct.cl";
=======
$host = "db.inf.uct.cl";
>>>>>>> Alex
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

<<<<<<< HEAD
$db = new mysqli($servername, $username, $password, $dbname);


if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
=======
// Crear conexion con la bd
$conexion = new mysqli($host, $username, $password, $dbname);

// Verificar conexion
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
>>>>>>> Alex
}
?>
