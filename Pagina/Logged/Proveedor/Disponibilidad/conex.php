<?php
$servidor = "db.inf.uct.cl";
$usuario = "acarrasco";
$contrasena = "Hellovro2019@";
$base_datos = "A2024_acarrasco";

$conn = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($db->connect_error) {
    die("Error en la conexión: " . $db->connect_error);
}
?>
