<?php
include 'conex.inc'; // Archivo de conexión

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idUsuarios = intval($_POST['idUsuarios']);
    $nombres = $db->real_escape_string($_POST['nombres']);
    $apellidos = $db->real_escape_string($_POST['apellidos']);
    $email = $db->real_escape_string($_POST['email']);

    // Consulta para actualizar el usuario
    $sql = "UPDATE usuariosMOVO 
            SET nombres = '$nombres', apellidos = '$apellidos', email = '$email' 
            WHERE idUsuarios = $idUsuarios";

    if ($db->query($sql) === TRUE) {
        echo "Usuario actualizado correctamente.";
    } else {
        echo "Error al actualizar el usuario: " . $db->error;
    }
}

$db->close();
?>

