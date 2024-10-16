<?php
include 'conexion.php'; // Conexión a la base de datos

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
                $response['redirect'] = "../../Logged/Clientes/HomeLogeado/home.html";
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