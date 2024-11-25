<?php
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

// Crear conexion con la bd
$conexion = new mysqli($host, $username, $password, $dbname);

// Verificar conexion
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}
?>
