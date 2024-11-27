<?php
include 'conexion.php'; // Conexión a la base de datos
session_start(); // Iniciar sesión

header('Content-Type: application/json'); // Respuesta en JSON

define('ENCRYPTION_KEY', 'F_VH39JUfZPOBFTJNWGXSmf4qHFhWRhW9a2kG8GoMpA='); // Clave usada en el registro
define('ENCRYPTION_METHOD', 'AES-256-CBC');

// Función para desencriptar
function decryptData($data, $key) {
    $decoded_data = base64_decode($data);
    if ($decoded_data === false) {
        sendErrorResponse('El formato de los datos encriptados es inválido.');
    }

    $parts = explode('::', $decoded_data, 2);
    if (count($parts) !== 2) {
        sendErrorResponse('Los datos encriptados están incompletos o mal formateados.');
    }

    [$encrypted_data, $iv] = $parts;
    $decrypted = openssl_decrypt($encrypted_data, ENCRYPTION_METHOD, $key, 0, $iv);
    if ($decrypted === false) {
        sendErrorResponse('Error al desencriptar los datos.');
    }

    return $decrypted;
}

// Función para verificar si una contraseña está encriptada
function isEncrypted($data) {
    $decoded_data = base64_decode($data, true); // Evitar errores fatales
    if ($decoded_data === false) {
        return false;
    }

    $parts = explode('::', $decoded_data);
    return count($parts) === 2 && !empty($parts[0]) && !empty($parts[1]);
}

// Función para manejar errores y enviar respuestas JSON
function sendErrorResponse($message) {
    echo json_encode(['success' => false, 'message' => $message]);
    exit();
}

$response = ['success' => false, 'message' => 'Ocurrió un error inesperado.'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validar campos obligatorios
    if (empty($email) || empty($password)) {
        sendErrorResponse('Correo electrónico y contraseña son obligatorios.');
    }

    // Consultar usuario por email
    $stmt = $conexion->prepare("SELECT idUsuarios, password, rol FROM usuariosMOVO WHERE email = ?");
    if (!$stmt) {
        sendErrorResponse('Error al preparar la consulta.');
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $stored_password, $rol);
        $stmt->fetch();

        // Verificar si la contraseña almacenada está encriptada
        if (isEncrypted($stored_password)) {
            $decrypted_password = decryptData($stored_password, ENCRYPTION_KEY);
            if ($decrypted_password !== $password) {
                sendErrorResponse('Contraseña incorrecta.');
            }
        } else {
            // Comparar directamente si la contraseña no está encriptada
            if ($stored_password !== $password) {
                sendErrorResponse('Contraseña incorrecta.');
            }
        }

        // Inicio de sesión exitoso
        $_SESSION['idUsuarios'] = $user_id;
        $_SESSION['rol'] = $rol;
        echo json_encode([
            'success' => true,
            'message' => 'Inicio de sesión exitoso.',
            'rol' => $rol,
            'user_id' => $user_id
        ]);
    } else {
        sendErrorResponse('Usuario no encontrado.');
    }

    $stmt->close();
    $conexion->close();
} else {
    sendErrorResponse('Solicitud inválida.');
}
?>
