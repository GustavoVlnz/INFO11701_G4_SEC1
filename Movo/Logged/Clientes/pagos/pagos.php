<?php
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

$serviciosDetalles = [];
$total = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['servicios'])) {
    $servicios = json_decode($_POST['servicios'], true);
    $serviciosJson = json_encode($servicios, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
    if (is_array($servicios) && !empty($servicios)) {
        foreach ($servicios as $servicio) {
            $idProveedor = intval($servicio['proveedorId']); // Obtener el id del proveedor

            // Consulta para obtener los servicios asociados al proveedor
            $sql = "SELECT nombre_servicio, proveedor_nombre, precio_servicio FROM Lista_ServiciosMOVO WHERE id_proveedor = $idProveedor";
            $result = $conn->query($sql);

            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $serviciosDetalles[] = $row;
                    $total += (float)$row['precio_servicio'];
                }
            }
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
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="stylesPagos.css" rel="stylesheet"> <!-- Archivo CSS externo -->
</head>
<body>
    <div class="container d-flex justify-content-center align-items-center my-5">
        <div class="card shadow-sm" style="max-width: 600px; width: 100%;">
            <div class="card-header bg-primary text-white text-center">
                <h2 class="h4 mb-0">Resumen de Pago</h2>
            </div>
            <div class="card-body">
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
                        <div>
                            <button class="btn btn-success me-2" id="botonPagar">Pagar</button>
                            <button class="btn btn-danger" id="botonCancelar" onclick="window.location.href='../HomeLogeado/home.html';">Cancelar Pedido</button>
                        </div>
                    </div>
                    <!-- Contenedor de métodos de pago -->
                    <div id="metodosPago" class="mt-4 d-none">
                        <h5>Seleccione su método de pago:</h5>
                        <div class="form-group">
                            <select class="form-select mt-2" id="metodoPago">
                                <option value="tarjeta_credito">Tarjeta de Crédito</option>
                                <option value="tarjeta_debito">Tarjeta de Débito</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                                <option value="paypal">PayPal</option>
                            </select>
                            <button class="btn btn-primary mt-3" id="mostrarFormulario">Continuar</button>
                        </div>
                    </div>
                    <!-- Formulario para datos de pago -->
                    <div id="formularioPago" class="mt-4 d-none">
                        <h5>Ingrese sus datos de pago:</h5>
                        <form>
                            <div class="mb-3">
                                <label for="nombreTitular" class="form-label">Nombre del Titular</label>
                                <input type="text" class="form-control" id="nombreTitular" placeholder="Nombre en la tarjeta">
                            </div>
                            <div class="mb-3">
                                <label for="numeroTarjeta" class="form-label">Número de Tarjeta</label>
                                <input type="text" class="form-control" id="numeroTarjeta" placeholder="XXXX XXXX XXXX XXXX">
                            </div>
                            <div class="mb-3">
                                <label for="fechaExpiracion" class="form-label">Fecha de Expiración</label>
                                <input type="month" class="form-control" id="fechaExpiracion">
                            </div>
                            <div class="mb-3">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cvv" placeholder="XXX">
                            </div>
                            <button type="button" class="btn btn-success mt-2" id="confirmarPago">Confirmar Pago</button>
                        </form>
                    </div>
                <?php else: ?>
                    <p class="text-danger">No se encontraron servicios para procesar.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="pagos.js"></script>
    <script type="application/json" id="dataServicios">
    <?php echo $serviciosJson; ?> 
</script>
</body>
</html>
