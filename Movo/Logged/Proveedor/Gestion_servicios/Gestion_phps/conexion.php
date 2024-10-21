<?php
$servidor = "db.inf.uct.cl";
$usuario = "acarrasco";
$contrasena = "Hellovro2019@";
$base_datos = "A2024_acarrasco";

$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}
?>
