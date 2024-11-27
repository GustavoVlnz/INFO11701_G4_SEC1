<?php
// Habilitar reportes de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Conectar a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$serviciosDetalles = [];
$total = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['servicios'])) {
    // Decodificar los servicios enviados en el JSON
    $servicios = json_decode($_POST['servicios'], true);

    if (is_array($servicios) && !empty($servicios)) {
        foreach ($servicios as $servicio) {
            $idServicio = intval($servicio['servicioId']);
            $idPrestador = intval($servicio['proveedorId']);

            // Validar que ambos IDs sean válidos
            if ($idServicio <= 0 || $idPrestador <= 0) {
                continue; // Ignorar este registro si no es válido
            }

            // Consulta SQL para obtener los detalles del servicio
            $sql = "
                SELECT 
                    ls.nombre_servicio, 
                    CONCAT(u.nombres, ' ', u.apellidos) AS proveedor_nombre, 
                    ls.precio_servicio
                FROM Lista_ServiciosMOVO AS ls
                INNER JOIN usuariosMOVO AS u ON ls.id_prestador = u.idUsuarios
                WHERE ls.id_servicio = ? AND ls.id_prestador = ?
            ";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $idServicio, $idPrestador);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $serviciosDetalles[] = $row;
                    $total += (float)$row['precio_servicio'];
                }
            }
            $stmt->close();
        }
    }
}

// Cerrar la conexión
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen de Pago</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="stylesPagos.css" rel="stylesheet">
</head>
<body>
<div class="container d-flex justify-content-center align-items-center my-5">
        <div class="card shadow-sm" style="max-width: 700px; width: 100%;">
            <div class="card-header bg-primary text-white text-center">
                <h2 class="h4 mb-0">Resumen de Pago</h2>
            </div>
            <div class="card-body">
                <!-- Mostrar los servicios seleccionados -->
                <?php if (!empty($serviciosDetalles)): ?>
                    <div class="list-group mb-4">
                        <?php foreach ($serviciosDetalles as $detalle): ?>
                            <div class="list-group-item border rounded mb-3 shadow-sm">
                                <p class="mb-1"><strong>Servicio:</strong> <?php echo htmlspecialchars($detalle['nombre_servicio']); ?></p>
                                <p class="mb-1"><strong>Proveedor:</strong> <?php echo htmlspecialchars($detalle['proveedor_nombre']); ?></p>
                                <p class="mb-1"><strong>Precio:</strong> $<?php echo number_format($detalle['precio_servicio'], 2); ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="h5"><strong>Total a pagar:</strong> $<?php echo number_format($total, 2); ?></p>
                        <button class="btn btn-success me-2" id="botonPagar">Pagar</button>
                    </div>

                    <div id="metodosPago" class="d-none">
                        <h5>Seleccione su método de pago:</h5>
                        <select id="metodoPago" class="form-select">
                            <option value="tarjeta_credito">Tarjeta de Crédito</option>
                            <option value="tarjeta_debito">Tarjeta de Débito</option>
                            <option value="transferencia">Transferencia Bancaria</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                        
                        <div class="container">
                            <div class="payment-apps">
                                <h3 class="text-center">Métodos de pago alternativos:</h3>
                                <div class="app-logos">
                                    <a href="https://www.somosmach.com/" target="_blank" title="Ir a Mach">
                                        <img src="Images/mach.png" alt="Mach" class="app-logo">
                                    </a>
                                    <a href="https://www.mercadopago.com/" target="_blank" title="Ir a Mercado Pago">
                                        <img src="Images/mercadopago.png" alt="Mercado Pago" class="app-logo">
                                    </a>
                                    <a href="https://www.paypal.com/" target="_blank" title="Ir a PayPal">
                                        <img src="Images/paypall.jpg" alt="PayPal" class="app-logo">
                                    </a>
                                    <a href="https://www.tenpo.cl/" target="_blank" title="Ir a Tenpo">
                                        <img src="Images/tenpo.png" alt="Tenpo" class="app-logo">
                                    </a>
                                </div>
                                <button id="mostrarFormulario" class="btn btn-primary mt-3">Continuar</button>
                            </div>
                        </div>
                    <div id="formularioPago" class="d-none">
                        <h5>Formulario de Pago</h5>
                        <form>
                            <label for="nombreTitular" class="form-label">Nombre del Titular</label>
                            <input type="text" id="nombreTitular" name="nombreTitular" placeholder="Nombre del Titular" class="form-control mb-2">

                            <label for="numeroTarjeta" class="form-label">Número de Tarjeta</label>
                            <input type="text" id="numeroTarjeta" name="numeroTarjeta" placeholder="Número de Tarjeta" class="form-control mb-2">

                            <label for="fechaExpiracion" class="form-label">Fecha de Expiración</label>
                            <input type="month" id="fechaExpiracion" name="fechaExpiracion" class="form-control mb-2">

                            <label for="cvv" class="form-label">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="CVV" class="form-control mb-2">

                            <button type="button" id="confirmarPago" class="btn btn-success">Confirmar Pago</button>
                        </form>
                    </div>
                <?php else: ?>
                    <p class="text-danger">No se encontraron servicios para procesar.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="application/json" id="serviciosDetalles">
    <?php echo json_encode($servicios ?? []); ?>
</script>
    <script src="pagos.js"></script>
</body>
</html>
