<?php
require_once 'conex.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Inicializar mensajes
        $mensajeExito = $mensajeError = '';

        if (isset($_POST['enviarCorreo'])) {
            // Validar entrada
            $email = trim($_POST['email'] ?? '');
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                // Verificar si el correo está registrado
                $stmt = $db->prepare("SELECT idUsuarios FROM usuariosMOVO WHERE email = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    // Generar y guardar código aleatorio
                    $codigo = random_int(100000, 999999);
                    $_SESSION['codigo'] = $codigo;
                    $_SESSION['email'] = $email;

                    // Enviar correo
                    $asunto = "Código de Verificación - MOVO";
                    $mensaje = "Tu código de verificación es: $codigo";
                    $cabeceras = "From: no-reply@movo.com";

                    if (mail($email, $asunto, $mensaje, $cabeceras)) {
                        $mensajeExito = "El código fue enviado a $email.";
                    } else {
                        $mensajeError = "Hubo un problema enviando el correo. Intenta más tarde.";
                    }
                } else {
                    $mensajeError = "El correo no está registrado.";
                }
                $stmt->close();
            } else {
                $mensajeError = "Correo inválido.";
            }
        } elseif (isset($_POST['verificarCodigo'])) {
            // Validar código
            $codigoIngresado = trim($_POST['codigo'] ?? '');
            if ($_SESSION['codigo'] == $codigoIngresado) {
                $mensajeExito = "Verificación exitosa. Tu cuenta está confirmada.";
                unset($_SESSION['codigo'], $_SESSION['email']);
            } else {
                $mensajeError = "El código ingresado es incorrecto.";
            }
        }

        // Pasar mensajes a la vista
        $_SESSION['mensajeExito'] = $mensajeExito;
        $_SESSION['mensajeError'] = $mensajeError;
    } catch (Exception $e) {
        $_SESSION['mensajeError'] = "Ocurrió un error: " . $e->getMessage();
    }
    header("Location: Autenticacion.php");
    exit;
}
?>
