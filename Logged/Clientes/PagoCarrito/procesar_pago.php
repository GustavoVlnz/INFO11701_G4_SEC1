<?php
// Conexión a la base de datos
include "conexion.inc";

// Recibir datos del formulario
$servicios = $_POST['servicio'];
$prestadores = $_POST['prestador'];
$precios = $_POST['precio'];
$cantidades = $_POST['cantidad'];
$total_pago = $_POST['total_pago'];

// Registro de la transacción
$sql = "INSERT INTO DetalleServicio (IDdetalle, Fecha, Total ) VALUES (?, NOW(), ?, ?, ?)";
$stmt = $db->prepare($sql);
$stmt->bind_param("iiss", $IDdetalle, $Total, );

// Asumiendo que tienes el $usuario_id de la sesión del usuario logueado
$IDdetalle = 1;  // Esto debe ser reemplazado por el ID real del usuario logueado

if ($stmt->execute()) {
    echo "Pago registrado exitosamente";
} else {
    echo "Error: " . $stmt->error;
}

$db->close();

