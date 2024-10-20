<?php
include 'conexion.inc';

$sql = "SELECT nombre, descripcion, precio, proveedor, email_proveedor, telefono_proveedor FROM Servicio WHERE Verificado = 'aprobado'";
$result = $conn->query($sql);

if ($result->rowCount() > 0) {
    // Obtener el primer servicio aprobado
    $row = $result->fetch(PDO::FETCH_ASSOC);

    // Genera el codigo JavaScript que actualizara los elementos HTML
    echo '<script>
        document.getElementById("servicio-nombre").innerText = "' . $row["nombre"] . '";
        document.getElementById("servicio-descripcion").innerText = "' . $row["descripcion"] . '";
        document.getElementById("proveedor-nombre").innerText = "' . $row["proveedor"] . '";
        document.getElementById("proveedor-email").innerText = "' . $row["email_proveedor"] . '";
        document.getElementById("proveedor-telefono").innerText = "' . $row["telefono_proveedor"] . '";
        document.getElementById("servicio-precio").innerText = "$' . $row["precio"] . ' CLP";
    </script>';
} else {
    echo '<script>
        document.getElementById("servicio-nombre").innerText = "No hay servicios disponibles.";
        document.getElementById("servicio-descripcion").innerText = "";
        document.getElementById("proveedor-nombre").innerText = "";
        document.getElementById("proveedor-email").innerText = "";
        document.getElementById("proveedor-telefono").innerText = "";
        document.getElementById("servicio-precio").innerText = "";
    </script>';
}




