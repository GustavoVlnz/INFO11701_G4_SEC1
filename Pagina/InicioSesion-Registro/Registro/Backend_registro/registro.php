<?php
<<<<<<< HEAD
include 'conexion.inc'; // Conexión a la base de datos

header('Content-Type: application/json'); // Establece la respuesta como JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombres = $_POST['username'];
    $apellidos = $_POST['apellido'];
    $rut = $_POST['rut'];
    $genero = $_POST['genero'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password']; // Confirmar contraseña
    $rol = $_POST['Rol'];

    // Validación: Verificar que las contraseñas coincidan
    if ($password !== $confirm_password) {
        echo json_encode([
            'success' => false,
            'message' => 'Las contraseñas no coinciden.'
        ]);
        exit();
    }

    // (Opcional) Validación adicional: verificar si el email ya está registrado
    $email_check_sql = "SELECT * FROM usuariosMOVO WHERE email = '$email'";
    $result = $db->query($email_check_sql);
    if ($result->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'El correo ya está registrado.'
        ]);
        exit();
    }

    // Consulta SQL para insertar los datos
    $sql = "INSERT INTO usuariosMOVO (nombres, apellidos, rut, genero, email, password, rol) 
            VALUES ('$nombres', '$apellidos', '$rut', '$genero', '$email', '$password', '$rol')";

    try {
        if ($db->query($sql) === TRUE) {
            $response = [
                'success' => true,
                'message' => 'Registro exitoso.'
            ];

            // Si el rol es 'empresa' o 'cliente', incluir la URL de redirección en la respuesta
            if ($rol == 'empresa') {
                $response['redirect'] = "../../Verificacion/FormVer.html";
            } elseif ($rol == 'cliente') {
                $response['redirect'] = "../../Logged/Clientes/HomeLogeado/home.html";
            }

            echo json_encode($response);
        } else {
            // Enviar mensaje de error si la consulta falla
            echo json_encode([
                'success' => false,
                'message' => 'Error al registrar: ' . $db->error
            ]);
        }
    } catch (Exception $e) {
        // Captura cualquier excepción y la envía como mensaje de error
        echo json_encode([
            'success' => false,
            'message' => 'Error en la ejecución: ' . $e->getMessage()
        ]);
    }

    // Cerrar la conexión
    $db->close();
}
?>
=======
// Habilitar el modo de errores para depuración (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexion.php'; // Conexión a la base de datos
session_start(); // Iniciar sesión

header('Content-Type: application/json'); // Establece la respuesta como JSON

// Inicializamos el array de respuesta
$response = array('success' => false, 'message' => 'Ocurrió un error inesperado.');

// Clave de encriptación (debe ser segura y almacenada de forma segura)
define('ENCRYPTION_KEY', 'F_VH39JUfZPOBFTJNWGXSmf4qHFhWRhW9a2kG8GoMpA='); // Reemplaza con tu clave segura
define('ENCRYPTION_METHOD', 'AES-256-CBC');

// Función para encriptar datos
function encryptData($data, $key) {
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length(ENCRYPTION_METHOD));
    $encrypted = openssl_encrypt($data, ENCRYPTION_METHOD, $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
}

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $nombres = $data['username'] ?? '';
        $apellidos = $data['apellido'] ?? '';
        $rut = $data['rut'] ?? '';
        $genero = $data['genero'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $confirm_password = $data['confirm-password'] ?? '';
        $rol = $data['Rol'] ?? '';
        $telefono = $data['telefono'] ?? '';
        $direccion = $data['direccion'] ?? '';

        // Validación: Verificar que las contraseñas coincidan
        if ($password !== $confirm_password) {
            throw new Exception('Las contraseñas no coinciden.');
        }

        // Cifrar la contraseña antes de almacenarla
        $encrypted_password = encryptData($password, ENCRYPTION_KEY);

        // Comprobar si el usuario ya existe en la base de datos
        $stmt = $conexion->prepare("SELECT * FROM usuariosMOVO WHERE email = ?");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta.');
        }
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            throw new Exception('El usuario ya está registrado.');
        }

        // Registrar al nuevo usuario
        $stmt = $conexion->prepare("INSERT INTO usuariosMOVO (nombres, apellidos, rut, genero, email, password, rol, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta de inserción.');
        }
        $stmt->bind_param('sssssssss', $nombres, $apellidos, $rut, $genero, $email, $encrypted_password, $rol, $telefono, $direccion); // Cambié el 'sssssss' a 'ssssssss' para coincidir
        
        if ($stmt->execute()) {
            // Obtener el ID del usuario recién insertado
            $user_id = $conexion->insert_id;
            // Guardar el ID y el rol del usuario en la sesión
            $_SESSION['idUsuarios'] = $user_id;
            $_SESSION['rol'] = $rol;

            // Respuesta exitosa con el rol y el ID para el frontend
            $response['success'] = true;
            $response['message'] = 'Registro exitoso.';
            $response['rol'] = $rol;
            $response['user_id'] = $user_id;
        } else {
            throw new Exception('Error al registrar el usuario.');
        }
    } else {
        throw new Exception('Solicitud inválida.');
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

// Cerrar la conexión
if (isset($stmt)) {
    $stmt->close();
}
$conexion->close();

// Devolver la respuesta JSON
echo json_encode($response);
exit();
?>
>>>>>>> Alex
