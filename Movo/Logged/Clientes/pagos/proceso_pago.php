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

// Verificar si la solicitud es POST y si se recibieron servicios
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['servicios'])) {
    $servicios = json_decode($_POST['servicios'], true);

    if (is_array($servicios) && !empty($servicios)) {
        $fechaSolicitud = date("Y-m-d H:i:s"); // Fecha actual

        foreach ($servicios as $servicio) {
            $idServicio = intval($servicio['servicioId']);
            $idPrestador = intval($servicio['proveedorId']); // Id del prestador enviado desde el carrito

            // Consultar datos del servicio
            $sqlServicio = "
                SELECT nombre_servicio
                FROM Lista_ServiciosMOVO 
                WHERE id_servicio = ? AND id_prestador = ?";
            $stmtServicio = $conn->prepare($sqlServicio);
            $stmtServicio->bind_param("ii", $idServicio, $idPrestador);
            $stmtServicio->execute();
            $resultServicio = $stmtServicio->get_result();

            if ($resultServicio->num_rows > 0) {
                $rowServicio = $resultServicio->fetch_assoc();
                $nombreServicio = $rowServicio['nombre_servicio'];

                // Insertar datos en la tabla Servicios_SolicitadosMOVO
                $sqlInsert = "
                    INSERT INTO Servicios_SolicitadosMOVO 
                    (id_solicitante, id_servicio, id_prestador, servicio_solicitado, estado_solicitud, fecha_solicitud) 
                    VALUES (?, ?, ?, ?, 'pendiente', ?)";
                $stmtInsert = $conn->prepare($sqlInsert);
                $stmtInsert->bind_param("iiiss", $idUsuario, $idServicio, $idPrestador, $nombreServicio, $fechaSolicitud);
                $stmtInsert->execute();
                $stmtInsert->close();
            } else {
                echo "Error: El servicio con ID $idServicio no se encontró para el prestador $idPrestador.";
            }

            $stmtServicio->close();
        }

        // Redirigir a la página de éxito
        header("Location: ./exito/exito.html");
        exit();
    } else {
        echo "Error: No se recibieron servicios para procesar.";
    }
} else {
    echo "Error: Datos de pago no válidos.";
}

// Cerrar la conexión
$conn->close();
?>
