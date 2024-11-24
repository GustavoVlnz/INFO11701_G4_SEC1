<?php
// Configura la conexión a la base de datos
$servername = "db.inf.uct.cl"; 
$username = "acarrasco"; 
$password = "Hellovro2019@"; 
$dbname = "A2024_acarrasco"; 

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verifica si se ha enviado un request para actualizar el estado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id']; // El ID del prestador
    $estado = $_POST['estado']; // El nuevo estado (aceptado, pendiente, rechazado)

    // Prepara la consulta para actualizar el estado en la base de datos
    $sql = "UPDATE empresaMOVO SET estado='$estado' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Estado actualizado con éxito";
    } else {
        echo "Error al actualizar el estado: " . $conn->error;
    }
}

// Cierra la conexión
$conn->close();
?>
