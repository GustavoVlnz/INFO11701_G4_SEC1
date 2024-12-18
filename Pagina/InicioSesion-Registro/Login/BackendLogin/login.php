<?php
include 'conexion.php'; // Asegúrate de que 'conexion.php' conecta bien a la BD

header('Content-Type: application/json'); // Establecer la respuesta como JSON

// Clave de encriptación (debe ser segura y almacenada de forma segura)
define('ENCRYPTION_KEY', 'F_VH39JUfZPOBFTJNWGXSmf4qHFhWRhW9a2kG8GoMpA='); // Debe coincidir con la clave utilizada en el registro
define('ENCRYPTION_METHOD', 'AES-256-CBC');

// Función para desencriptar datos
function decryptData($data, $key) {
    list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
    return openssl_decrypt($encrypted_data, ENCRYPTION_METHOD, $key, 0, $iv);
}
// Función para verificar si la contraseña parece estar encriptada
function isEncrypted($data) {
    // Verifica si el formato contiene "::" que es característico de nuestra encriptación AES con IV
    return strpos($data, '::') !== false;
}

$error = ''; // Variable para errores lógicos
$executionError = ''; // Variable para errores de ejecución

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Para capturar excepciones

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (session_status() === PHP_SESSION_NONE) {
        session_start(); // Inicia la sesión solo si no hay una activa
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta para obtener el usuario por correo electrónico
    $stmt = $conexion->prepare("SELECT idUsuarios, password, rol FROM usuariosMOVO WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id_usuario, $hashed_password, $rol);
        $stmt->fetch();

        // Verificar si la contraseña almacenada está encriptada
        if (isEncrypted($hashed_password)) {
            // Desencripta la contraseña almacenada
            $decrypted_password = decryptData($hashed_password, ENCRYPTION_KEY); // Usa tu función personalizada
            // Comparar contraseñas
            if ($password === $decrypted_password) {
                $_SESSION['idUsuarios'] = $id_usuario;
                $_SESSION['rol'] = $rol;
                echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
            }
        } else {
            // Comparar contraseñas no encriptadas directamente
            if ($password === $hashed_password) {
                $_SESSION['idUsuarios'] = $id_usuario;
                $_SESSION['rol'] = $rol;
                echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
    }

    $stmt->close();
    $conexion->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Solicitud inválida.']);
}
?>
