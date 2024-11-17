<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conectar a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si el usuario está autenticado
if (!isset($_SESSION['idUsuarios'])) {
    die("Error: No hay un usuario autenticado.");
}

$idUsuario = $_SESSION['idUsuarios'];
$nombreCliente = "Cliente desconocido"; // Valor por defecto si no se encuentra el nombre

// Obtener el nombre del cliente mediante idUsuario
$sqlCliente = "SELECT nombres FROM usuariosMOVO WHERE idUsuarios = ?";
$stmtCliente = $conn->prepare($sqlCliente);
$stmtCliente->bind_param("i", $idUsuario);
$stmtCliente->execute();
$resultCliente = $stmtCliente->get_result();
if ($resultCliente->num_rows > 0) {
    $rowCliente = $resultCliente->fetch_assoc();
    $nombreCliente = $rowCliente['nombres'];
}
$stmtCliente->close();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['servicios'])) {
    $servicios = json_decode($_POST['servicios'], true);

    if (is_array($servicios) && !empty($servicios)) {
        foreach ($servicios as $servicio) {
            $idServicio = intval($servicio['servicioId']);

            // Consulta para obtener el nombre del servicio
            $sqlServicio = "SELECT nombre_servicio FROM Lista_ServiciosMOVO WHERE id_servicio = ?";
            $stmtServicio = $conn->prepare($sqlServicio);
            $stmtServicio->bind_param("i", $idServicio);
            $stmtServicio->execute();
            $resultServicio = $stmtServicio->get_result();
            $nombreServicio = 'Nombre desconocido'; // Valor por defecto si no se encuentra el servicio
            if ($resultServicio->num_rows > 0) {
                $rowServicio = $resultServicio->fetch_assoc();
                $nombreServicio = $rowServicio['nombre_servicio'];
            }
            $stmtServicio->close();

            $fechaSolicitud = date("Y-m-d H:i:s"); // Fecha actual

            // Insertar los datos en la tabla Servicios_SolicitadosMOVO
            $sqlInsert = "INSERT INTO Servicios_SolicitadosMOVO (idUsuario, id_servicio, servicio_solicitado, estado, fecha_solicitud, cliente) 
                          VALUES (?, ?, ?, 'pendiente', ?, ?)";
            $stmtInsert = $conn->prepare($sqlInsert);
            $stmtInsert->bind_param("iisss", $idUsuario, $idServicio, $nombreServicio, $fechaSolicitud, $nombreCliente);
            $stmtInsert->execute();
            $stmtInsert->close();
        }
        echo "Pago procesado exitosamente.";
    } else {
        echo "Error: No se recibieron servicios para procesar.";
    }
} else {
    echo "Error: Datos de pago no válidos.";
}

// Cerrar la conexión
$conn->close();
?>
