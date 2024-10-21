<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Consulta para obtener el conteo de cada calificación
$sql = "SELECT 
            SUM(CASE WHEN calificacion >= 1.0 AND calificacion < 2.0 THEN 1 ELSE 0 END) AS estrellas1,
            SUM(CASE WHEN calificacion >= 2.0 AND calificacion < 3.0 THEN 1 ELSE 0 END) AS estrellas2,
            SUM(CASE WHEN calificacion >= 3.0 AND calificacion < 4.0 THEN 1 ELSE 0 END) AS estrellas3,
            SUM(CASE WHEN calificacion >= 4.0 AND calificacion < 5.0 THEN 1 ELSE 0 END) AS estrellas4,
            SUM(CASE WHEN calificacion = 5.0 THEN 1 ELSE 0 END) AS estrellas5
        FROM CompletadosMOVO";
$result = $conn->query($sql);

$data = $result->fetch_assoc();

echo json_encode($data);

$conn->close();
?>
