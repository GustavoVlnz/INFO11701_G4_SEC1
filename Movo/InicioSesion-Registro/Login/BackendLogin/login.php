<?php
session_start(); // Iniciar la sesión

include 'conexion.php'; // Asegúrate de que 'conexion.php' establece la conexión a la base de datos correctamente

$error = ''; // Variable para almacenar el mensaje de error
$executionError = ''; // Variable para almacenar errores de ejecución

// Establecer modo de error
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Esto permite que se lancen excepciones para errores de MySQLi

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Consulta para verificar el email y la contraseña, y obtener el rol del usuario
        $sql = "SELECT rol FROM usuarios WHERE email = ? AND password = ?";
        $stmt = $db->prepare($sql); // Cambiar $conn a $db
        $stmt->bind_param("ss", $email, $password); // Vincular los parámetros
        $stmt->execute();
        $stmt->store_result();
        
        // Si se encuentra el usuario en la base de datos
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($rol); // Obtener el rol del usuario
            $stmt->fetch();

            // Asignar el rol a la sesión
            $_SESSION['rol'] = $rol;

            // Redirigir al usuario a la página de inicio
            header("Location: ../../../Logged/Clientes/HomeLogeado/home.html");
            exit();
        } else {
            // Usuario no encontrado o contraseña incorrecta
            $error = "Correo o contraseña incorrectos."; // Almacenar el mensaje de error
        }
    } catch (Exception $e) {
        // Capturar errores de ejecución y almacenarlos en la variable $executionError
        $executionError = "Error en la ejecución: " . $e->getMessage();
    }

    $stmt->close();
    $db->close(); // Cambiar $conn a $db
}
?>
