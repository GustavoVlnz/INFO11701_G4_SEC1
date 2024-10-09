<?php
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$db = new mysqli($servername, $username, $password, $dbname);


if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}
?>