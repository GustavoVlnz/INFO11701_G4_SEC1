<?php
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

// Crear conexion con la bd
$db = new mysqli($servername, $username, $password, $dbname);

// Verificar conexion
if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}
