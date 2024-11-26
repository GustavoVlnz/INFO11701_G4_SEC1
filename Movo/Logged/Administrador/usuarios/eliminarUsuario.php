<?php
include 'conex.inc'; // Tu archivo de conexión

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['idUsuarios']);

    $sql = "DELETE FROM usuariosMOVO WHERE idUsuarios=$id";

    if ($db->query($sql) === TRUE) {
        echo "Usuario eliminado correctamente.";
    } else {
        echo "Error al eliminar el usuario: " . $db->error;
    }
}
$db->close();
?>
