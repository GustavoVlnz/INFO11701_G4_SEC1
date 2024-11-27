<?php
session_start();
if (!isset($_SESSION['idUsuarios'])) {
    header('Location: ../login.php');
    exit();
}

$idUsuario = $_SESSION['idUsuarios'];

include_once('../conexion.php'); // Asegúrate de que esta conexión funciona correctamente

// Consulta a la base de datos
$query = "SELECT p.servicio, p.fecha_solicitud, p.direccion, u.nombres AS prestador_nombre, u.apellidos AS prestador_apellido, p.estado, p.historial 
          FROM pedidos p
          JOIN usuariosMOVO  ON p.idPrestador = u.idUsuarios
          WHERE p.idUsuario = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$result = $stmt->get_result();
$pedido = $result->fetch_assoc();

if (!$pedido) {
    echo "No se encontraron detalles del pedido.";
    exit();
}

// Convertir historial JSON a un array PHP
$historial = json_decode($pedido['historial'], true);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Pedido</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="progresoPedido.css">
</head>
<body>
    <header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div class="d-flex align-items-center" id="logo">
          <img src="imagenes/logo.png" alt="Logo Movo" class="me-2">
          <h1 class="m-0">MOVO</h1>
        </div>
        <nav>
          <a href="../HomeLogeado/home.html">Inicio</a>
          <a href="../categorias/categorias.html">Servicios</a>
          <a href="../../verificador.php">Perfil</a>
        </nav>
        <div id="logo-salir">
          <img src="imagenes/salir.png" alt="Salir" style="width: 50px;">
        </div>
    </header>

    <section class="progreso-servicio">
        <h2>Detalles y Progreso del Pedido</h2><br>
        <div class="detalles-orden">
            <p>Servicio: <b><?= htmlspecialchars($pedido['servicio']) ?></b></p>
            <p>Fecha de solicitud: <b><?= htmlspecialchars($pedido['fecha_solicitud']) ?></b></p>
            <p>Dirección: <b><?= htmlspecialchars($pedido['direccion']) ?></b></p><br>
        </div>

        <div class="detalle-provedor">
            <h3>Prestador de Servicios</h3>
            <p>Nombre: <b><?= htmlspecialchars($pedido['prestador_nombre'] . " " . $pedido['prestador_apellido']) ?></b></p>
            <p>Estado: <b><?= htmlspecialchars($pedido['estado']) ?></b></p>
        </div>

        <div class="pedido-detalles">
            <h2>Progreso del Servicio</h2>
            <div class="barra-contenedor">
                <div id="barra-progreso" style="width: <?= rand(30, 90) ?>%;"></div>
            </div>
            <p id="estado-servicio"><?= htmlspecialchars($pedido['estado']) ?></p>
        </div>

        <div class="historial">
            <h3>Historial</h3>
            <?php foreach ($historial as $evento => $hora): ?>
                <p><?= htmlspecialchars($evento) ?>: <b><?= htmlspecialchars($hora) ?></b></p>
            <?php endforeach; ?>
        </div>
    </section>

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
                    <a href="/Pagina Oficial/politica y privacidad/politica y privacidad.html" class="contenido-footer">Política de Privacidad</a><br>
                    <a href="/Pagina Oficial/Registro/terminos.html" class="contenido-footer">Términos de Servicio</a>
                </div>
            </div>
            <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>
