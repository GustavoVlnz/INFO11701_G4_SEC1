<?php
$servidor = "db.inf.uct.cl";
$usuario = "acarrasco";
$contrasena = "Hellovro2019@";
$base_datos = "A2024_acarrasco";

<<<<<<< HEAD
$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
=======
$conn = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
>>>>>>> Alex
}
?>
