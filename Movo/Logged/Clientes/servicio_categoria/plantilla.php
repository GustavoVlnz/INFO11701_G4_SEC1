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

// Consulta para obtener los servicios de la categoría con los nombres y apellidos del proveedor
$query_servicios = "
    SELECT 
        ls.id_servicio, 
        ls.nombre_servicio, 
        ls.descripcion_corta, 
        ls.precio_servicio,
        ls.estado_servicio,
        ls.id_categoria,
        u.idUsuarios AS id_prestador,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo_prestador
    FROM Lista_ServiciosMOVO AS ls
    INNER JOIN usuariosMOVO AS u ON ls.id_prestador = u.idUsuarios
    WHERE ls.id_categoria = $categoria_id
";

$resultado_servicios = $conexion->query($query_servicios);

$servicios_agrupados = [];

// Agrupar servicios por nombre de servicio
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
        <img src="../Perfil/Images/logo.png" alt="Logo Movo" class="me-2">
        <h1 class="m-0">MOVO</h1>
    </div>
    <nav>
        <a href="../HomeLogeado/home.html">Inicio</a>
        <a href="../../verificador.php">Perfil</a>
    </nav>
    <div id="logo-salir">
        <img src="../Perfil/Images/logout.png" alt="Salir" style="width: 50px;">
    </div>
</header>

<div class="container my-4">
    <h2>Lista de servicios</h2>
    <div class="row">
        <?php foreach ($servicios_agrupados as $nombre_servicio => $datos) { ?>
            <div class="col-md-4 mb-4 d-flex">
                <div class="card shadow-sm h-100 w-100 d-flex flex-column">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><?php echo htmlspecialchars($nombre_servicio); ?></h5>
                        <p class="card-text"><?php echo htmlspecialchars($datos['descripcion_corta']); ?></p>
                        <!-- Lista desplegable para seleccionar proveedores -->
                        <select class="form-select mb-3 select-proveedor" 
                                data-id-servicio="<?php echo htmlspecialchars($datos['servicios'][0]['id_servicio']); ?>" 
                                data-id-categoria="<?php echo htmlspecialchars($categoria_id); ?>">
                            <option value="" selected>Seleccione un proveedor</option>
                            <?php foreach ($datos['servicios'] as $servicio) { ?>
                                <option value="<?php echo $servicio['id_prestador']; ?>" 
                                        data-id-servicio="<?php echo $servicio['id_servicio']; ?>" 
                                        data-id-categoria="<?php echo $categoria_id; ?>">
                                    <?php echo htmlspecialchars($servicio['nombre_completo_prestador']); ?> - $<?php echo htmlspecialchars($servicio['precio_servicio']); ?>
                                </option>
                            <?php } ?>
                        </select>

                        <!-- Botones de acción -->
                        <div class="mt-auto">
                            <button class="btn btn-success agregar-carrito-btn mb-2" 
                                    data-id-servicio="<?php echo htmlspecialchars($datos['servicios'][0]['id_servicio']); ?>" 
                                    data-id-categoria="<?php echo htmlspecialchars($categoria_id); ?>">
                                Agregar al Carrito
                            </button>
                            <button class="btn btn-primary ver-detalles-btn mb-2" 
                                    data-id-servicio="<?php echo htmlspecialchars($datos['servicios'][0]['id_servicio']); ?>" 
                                    data-id-categoria="<?php echo htmlspecialchars($categoria_id); ?>">
                                Ver Detalles
                            </button>
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
        <div class="mt-3">
            <button id="boton-pagar" class="btn btn-primary" style="display: none;">Pagar</button>
            <a id="boton-volver" href="../categorias/categorias.html" class="btn btn-secondary">Volver a Categorías</a>
        </div>
    </div>
</div>

<footer class="text-white text-center py-4">
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
            <div class="col-md-4">
                <h3>Información Legal</h3>
                <a href="../../../InicioSesion-Registro/politica y privacidad/politica y privacidad.html" class="contenido-footer">Política de Privacidad</a><br>
                <a href="../../../InicioSesion-Registro/Registro/terminos.html" class="contenido-footer">Términos de Servicio</a>
            </div>
        </div>
        <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
    </div>
</footer>
<script>
    const categoriaId = <?php echo isset($categoria_id) ? $categoria_id : 0; ?>;
</script>
<script src="plantilla.js"></script>
</body>
</html>
<?php
$conexion->close();
?>
