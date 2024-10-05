
<?php
include 'conexion.inc';//Conexion con la base de datos

// Obtener los datos enviados desde el formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Consulta SQL para verificar si el usuario existe y las credenciales son correctas
$sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";
$result = $db->query($sql);

if ($result->num_rows > 0) {
    echo "Inicio de sesión exitoso. Bienvenido!";

    // Redirige a la pagina principal s
    header("Location: home.html");
} else {
    // Credenciales incorrectas
    echo "Correo o contraseña incorrectos.";
}

// Cerrar la conexión
$db->close();
?>
