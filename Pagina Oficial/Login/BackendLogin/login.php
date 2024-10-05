
<?php
include 'conexion.inc';


$email = $_POST['email'];
$password = $_POST['password'];


$sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";
$result = $db->query($sql);

if ($result->num_rows > 0) {
    echo "Inicio de sesión exitoso. Bienvenido!";

    header("Location: home.html");
} else {
 
    echo "Correo o contraseña incorrectos.";
}


$db->close();
?>
