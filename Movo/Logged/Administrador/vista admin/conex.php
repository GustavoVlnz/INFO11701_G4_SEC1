<?php
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

?>
