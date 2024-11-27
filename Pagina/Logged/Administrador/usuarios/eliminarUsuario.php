<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once 'conex.inc'; // Asegúrate de que `$db` esté configurado correctamente

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['idUsuarios']) || empty($_POST['idUsuarios'])) {
        http_response_code(400); // Solicitud incorrecta
        echo "No se recibió el ID del usuario.";
        exit;
    }

    $idUsuarios = intval($_POST['idUsuarios']);

    // Inicia una transacción para mantener la integridad de los datos
    $db->begin_transaction();

    try {
        // Elimina registros en la tabla `clientesMOVO` (clave foránea correcta)
        $queryClientes = "DELETE FROM clientesMOVO WHERE idCliente = ?";
        $stmtClientes = $db->prepare($queryClientes);
        $stmtClientes->bind_param('i', $idUsuarios);
        $stmtClientes->execute();

        // Verifica si ocurrió un error en la eliminación de registros relacionados
        if ($stmtClientes->affected_rows === 0) {
            throw new Exception("No se encontraron registros relacionados en clientesMOVO.");
        }

        // Elimina el usuario en `usuariosMOVO`
        $queryUsuarios = "DELETE FROM usuariosMOVO WHERE idUsuarios = ?";
        $stmtUsuarios = $db->prepare($queryUsuarios);
        $stmtUsuarios->bind_param('i', $idUsuarios);
        $stmtUsuarios->execute();

        // Verifica si se eliminó correctamente el usuario
        if ($stmtUsuarios->affected_rows === 0) {
            throw new Exception("No se pudo eliminar el usuario en usuariosMOVO.");
        }

        // Confirma la transacción
        $db->commit();
        echo "Usuario eliminado correctamente.";
    } catch (Exception $e) {
        // Revertir cambios si ocurre algún error
        $db->rollback();
        http_response_code(500); // Error interno del servidor
        echo "Error al eliminar el usuario: " . $e->getMessage();
    }
}
