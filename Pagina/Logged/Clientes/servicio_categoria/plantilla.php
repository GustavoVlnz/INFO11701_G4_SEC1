<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Conexión a la base de datos
$conexion = new mysqli('db.inf.uct.cl', 'acarrasco', 'Hellovro2019@', 'A2024_acarrasco');
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener la ID de la categoría desde la solicitud anterior
$categoria_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Consulta para obtener servicios de la categoría seleccionada
$query_servicios = "SELECT id_servicio, nombre_servicio, descripcion_corta, id_categoria FROM Lista_ServiciosMOVO WHERE id_categoria = $categoria_id";
$resultado_servicios = $conexion->query($query_servicios);

$servicios_agrupados = [];

// Agrupar servicios por nombre de servicio (texto)
while ($servicio = $resultado_servicios->fetch_assoc()) {
    $nombre_servicio = $servicio['nombre_servicio'];
    if (!isset($servicios_agrupados[$nombre_servicio])) {
        $servicios_agrupados[$nombre_servicio] = [
            'descripcion_corta' => $servicio['descripcion_corta'],
            'servicios' => []
        ];
    }
    $servicios_agrupados[$nombre_servicio]['servicios'][] = $servicio;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servicios de la Categoría</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="stylesheet" href="plantilla.css">
</head>
<body>
<header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div class="d-flex align-items-center" id="logo">
          <img src="logo.png" alt="Logo Movo" class="me-2" ">
          <h1 class="m-0">MOVO</h1>
        </div>
        <nav>
          <a href="../HomeLogeado/home.html" >Inicio</a>
          <a href="../../verificador.php" >Perfil</a>
        </nav>
        <div id="logo-salir">
          <img src="images/logout.png" alt="Salir" style="width: 50px;">
        </div>
    </header>

    <div class="container my-4">
        <h2>Lista de servicios</h2>
        <div class="row">
            <?php
            // Consulta optimizada para obtener todos los proveedores relacionados de una vez
            $servicio_ids = array_column(array_merge(...array_column($servicios_agrupados, 'servicios')), 'id_servicio');
            if ($servicio_ids) {
                $servicio_ids_str = implode(',', $servicio_ids);
                $query_proveedores = "SELECT id_proveedor, proveedor_nombre, precio_servicio, id_servicio FROM Lista_ServiciosMOVO WHERE id_servicio IN ($servicio_ids_str)";
                $resultado_proveedores = $conexion->query($query_proveedores);
                $proveedores_por_servicio = [];
                while ($proveedor = $resultado_proveedores->fetch_assoc()) {
                    $proveedores_por_servicio[$proveedor['id_servicio']][] = $proveedor;
                }
            }

            foreach ($servicios_agrupados as $nombre_servicio => $datos) { ?>
                <div class="col-md-3 mb-4 d-flex"> <!-- d-flex para hacer que la columna use flexbox -->
                    <div class="card shadow-sm h-100 w-100 d-flex flex-column"> <!-- flex-column para alinear el contenido verticalmente -->
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"><?php echo htmlspecialchars($nombre_servicio); ?></h5>
                            <p class="card-text flex-grow-1"><?php echo htmlspecialchars($datos['descripcion_corta']); ?></p> <!-- flex-grow-1 permite que esta sección crezca y mantenga uniformidad -->

                            <!-- Lista desplegable de proveedores -->
                            <select class="form-select mb-3" id="select-<?php echo htmlspecialchars($nombre_servicio); ?>" name="select-<?php echo htmlspecialchars($nombre_servicio); ?>">
                                <option selected>Seleccione un proveedor</option>
                                <?php
                                foreach ($datos['servicios'] as $servicio) {
                                    $id_servicio = $servicio['id_servicio'];
                                    if (!empty($proveedores_por_servicio[$id_servicio])) {
                                        foreach ($proveedores_por_servicio[$id_servicio] as $proveedor) {
                                            echo "<option value='{$proveedor['id_proveedor']}'>{$proveedor['proveedor_nombre']} - $ {$proveedor['precio_servicio']}</option>";
                                        }
                                    }
                                }
                                ?>
                            </select>

                            <!-- Botones alineados uniformemente al final -->
                            <div class="mt-auto"> <!-- mt-auto empuja estos elementos hacia la parte inferior del contenedor -->
                                <button class="btn btn-success agregar-carrito-btn mb-2" data-id="<?php echo $id_servicio; ?>" data-nombre="<?php echo htmlspecialchars($nombre_servicio); ?>">Agregar al Carrito</button>
                                <a href="../detalle_pedido/detalle.php?proveedor_id=<?php echo isset($proveedor) ? $proveedor['id_proveedor'] : ''; ?>&id_categoria=<?php echo $categoria_id; ?>" class="btn btn-primary mb-2" id="detalle-pedido-<?php echo isset($proveedor) ? $proveedor['id_proveedor'] : 'default'; ?>">Ver detalles</a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
        <!-- Carrito de servicios -->
        <h3 class="mt-4">Carrito de Servicios</h3>
        <div id="carrito" class="border p-3">
            <p id="carrito-vacio">El carrito está vacío.</p>
            <ul id="lista-carrito" class="list-group"></ul>
            <!-- Botones del carrito -->
            <div class="mt-3">
                <button id="boton-pagar" class="btn btn-primary" style="display: none;">Pagar</button>
                <a id="boton-volver" href="categorias.html" class="btn btn-secondary">Volver a Categorías</a>
            </div>
        </div>
    </div>

    <footer class=" text-white text-center py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h3>Contacto</h3>
                    <p>Email: contacto@movo.com</p>
                </div>
                <div class="col-md-4">
                    <h3>Redes Sociales</h3>
                    <a href="https://www.facebook.com/profile.php?id=61566403465579" class="contenido-footer">Facebook</a><br>
                    <a href="https://x.com/CompanyMovo_inc" class="contenido-footer">Twitter</a><br>
                    <a href="https://www.instagram.com/movo_inc/" class="contenido-footer">Instagram</a>
                </div>
                <div class="col-md-4 ">
                    <h3>Información Legal</h3>
                    <a href="../../../InicioSesion-Registro/politica y privacidad/politica y privacidad.html y privacidad/politica y privacidad.html" class="contenido-footer">Política de Privacidad</a><br>
                    <a href="../../../InicioSesion-Registro/Registro/terminos.html" class="contenido-footer">Términos de Servicio</a>
                </div>
            </div>
            <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
        </div>
    </footer>
    <script src="plantilla.js"></script>
</body>
</html>
<?php
$conexion->close();
?>
