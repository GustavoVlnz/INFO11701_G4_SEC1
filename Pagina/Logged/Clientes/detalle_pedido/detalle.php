<?php
// Conexión a la base de datos
$servername = "db.inf.uct.cl"; // Ajusta estos valores según tu configuración
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$conexion = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Verificar si se ha proporcionado un ID de proveedor
$id_proveedor = isset($_GET['proveedor_id']) ? intval($_GET['proveedor_id']) : 0;
if ($id_proveedor <= 0) {
    echo "ID de proveedor no válido.";
    exit;
}
$id_categoria = isset($_GET['id_categoria']) ? intval($_GET['id_categoria']) : 0;

// Consulta a la base de datos
$sql = "SELECT nombre_servicio, proveedor_nombre, descripcion_larga, precio_servicio FROM Lista_ServiciosMOVO WHERE id_proveedor = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_proveedor);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $servicio = $resultado->fetch_assoc();
} else {
    echo "No se encontraron detalles para el proveedor seleccionado.";
    exit;
}

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
        <img src="../Perfil/Images/logo.png" alt="Logo Movo" class="me-2" ">
        <h1 class="m-0">MOVO</h1>
    </div>
    <nav>
        <a href="../HomeLogeado/home.html" >Inicio</a>
        <a href="../../verificador.php" >Perfil</a>
    </nav>
    <div id="logo-salir">
        <img src="../Perfil/Images/logout.png" alt="Salir" style="width: 50px;">
    </div>
</header>
    <div class="container my-5">
        <div class="card detalle-card shadow-lg">
            <div class="card-header bg-primary text-white">
                <h3><?php echo htmlspecialchars($servicio['nombre_servicio']); ?></h3>
            </div>
            <div class="card-body">
                <h5 class="card-title">Proveedor: <?php echo htmlspecialchars($servicio['proveedor_nombre']); ?></h5>
                <p class="card-text"><?php echo htmlspecialchars($servicio['descripcion_larga']); ?></p>
                <p class="card-text"><strong>Precio: </strong>$<?php echo number_format($servicio['precio_servicio'], 2); ?></p>
                <a href="../servicio_categoria/plantilla.php?id=<?php echo $id_categoria; ?>" class="btn btn-primary btn-animado">Volver a la lista de servicios</a>
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
</body>
</html>
