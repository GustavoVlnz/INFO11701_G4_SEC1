<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conexion = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Verificar los parámetros de la solicitud
$id_proveedor = isset($_GET['proveedor_id']) ? intval($_GET['proveedor_id']) : 0;
$id_categoria = isset($_GET['id_categoria']) ? intval($_GET['id_categoria']) : 0;
$id_servicio = isset($_GET['id_servicio']) ? intval($_GET['id_servicio']) : 0;

if ($id_proveedor <= 0 || $id_categoria <= 0 || $id_servicio <= 0) {
    echo "Parámetros no válidos.";
    exit;
}

// Consulta para obtener los detalles del servicio
$sql = "
    SELECT 
        ls.nombre_servicio,
        ls.descripcion_larga,
        ls.precio_servicio,
        CONCAT(u.nombres, ' ', u.apellidos) AS proveedor_nombre
    FROM Lista_ServiciosMOVO AS ls
    INNER JOIN usuariosMOVO AS u ON ls.id_prestador = u.idUsuarios
    WHERE ls.id_prestador = ? AND ls.id_categoria = ? AND ls.id_servicio = ?
";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("iii", $id_proveedor, $id_categoria, $id_servicio);
$stmt->execute();
$resultado = $stmt->get_result();
$servicio = $resultado->fetch_assoc();

// Consulta para obtener las reseñas del servicio completado
$sql_reviews = "
    SELECT 
        sc.reseña AS reseñas,
        sc.fecha_completado,
        sc.calificacion,
        CONCAT(uc.nombres, ' ', uc.apellidos) AS cliente_nombre
    FROM Servicios_CompletadosMOVO AS sc
    INNER JOIN usuariosMOVO AS uc ON sc.id_cliente = uc.idUsuarios
    WHERE sc.id_prestador = ? AND sc.id_servicio = ?
";
$stmt_reviews = $conexion->prepare($sql_reviews);
$stmt_reviews->bind_param("ii", $id_proveedor, $id_servicio);
$stmt_reviews->execute();
$resultado_reviews = $stmt_reviews->get_result();

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Servicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="stylesheet" href="detalle.css">
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
<div class="container my-5">
    <!-- Detalle del servicio -->
    <?php if ($servicio): ?>
        <div class="card detalle-card shadow-lg mb-4">
            <div class="card-header bg-primary text-white">
                <h3><?php echo htmlspecialchars($servicio['nombre_servicio'] ?? 'Servicio no disponible'); ?></h3>
            </div>
            <div class="card-body">
                <h5 class="card-title">Proveedor: <?php echo htmlspecialchars($servicio['proveedor_nombre'] ?? 'Desconocido'); ?></h5>
                <p class="card-text"><?php echo htmlspecialchars($servicio['descripcion_larga'] ?? 'Sin descripción'); ?></p>
                <p class="card-text"><strong>Precio: </strong>$<?php echo number_format($servicio['precio_servicio'] ?? 0, 2); ?></p>
                <a href="../servicio_categoria/plantilla.php?id=<?php echo $id_categoria; ?>" class="btn btn-primary btn-animado">Volver a la lista de servicios</a>
            </div>
        </div>
    <?php else: ?>
        <p class="alert alert-warning">No se encontraron detalles para el servicio solicitado.</p>
    <?php endif; ?>

    <!-- Sección de Reseñas -->
    <div class="card detalle-card shadow-lg">
        <div class="card-header bg-secondary text-white">
            <h3>Reseñas del Servicio</h3>
        </div>
        <div class="card-body">
            <?php if ($resultado_reviews && $resultado_reviews->num_rows > 0): ?>
                <?php while ($review = $resultado_reviews->fetch_assoc()): ?>
                    <div class="review-container mb-3">
                        <p class="card-text"><strong>Cliente:</strong> <?php echo htmlspecialchars($review['cliente_nombre'] ?? 'Nombre no disponible'); ?></p>
                        <p class="card-text"><strong>Reseña:</strong> <?php echo htmlspecialchars($review['reseñas'] ?? 'Sin reseña'); ?></p>
                        <p class="card-text"><strong>Calificación:</strong> <?php echo htmlspecialchars($review['calificacion'] ?? 'Sin calificación'); ?></p>
                        <p class="card-text"><small class="text-muted">Fecha: <?php echo htmlspecialchars($review['fecha_completado'] ?? 'Fecha no disponible'); ?></small></p>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <p class="alert alert-info">No hay reseñas disponibles para este proveedor.</p>
            <?php endif; ?>
        </div>
    </div>
</div>
<footer class="text-white text-center py-4">
    <div class="container">
        <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
    </div>
</footer>
</body>
</html>
