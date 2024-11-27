<?php
session_start();
if (!isset($_SESSION['idUsuarios'])) {
    header('Location: ../login.php');
    exit();
}

$idUsuario = $_SESSION['idUsuarios'];

include_once('conex.php'); // Conexión a la base de datos

// Consultas a la base de datos
$query_pendientes = "SELECT servicio_solicitado, fecha_solicitud, estado_solicitud FROM Servicios_SolicitadosMOVO WHERE id_solicitante = ? AND estado_solicitud = 'Pendiente'";
$query_finalizados = "SELECT servicio_solicitado, fecha_solicitud, estado_solicitud FROM Servicios_SolicitadosMOVO WHERE id_solicitante = ? AND estado_solicitud = 'Finalizado'";

// Ejecutar consultas
$stmt_pendientes = $conn->prepare($query_pendientes);
$stmt_pendientes->bind_param("i", $idUsuario);
$stmt_pendientes->execute();
$result_pendientes = $stmt_pendientes->get_result();

$stmt_finalizados = $conn->prepare($query_finalizados);
$stmt_finalizados->bind_param("i", $idUsuario);
$stmt_finalizados->execute();
$result_finalizados = $stmt_finalizados->get_result();

// Convertir resultados en arrays PHP
$serviciosPendientes = [];
while ($row = $result_pendientes->fetch_assoc()) {
    $serviciosPendientes[] = $row;
}

$serviciosFinalizados = [];
while ($row = $result_finalizados->fetch_assoc()) {
    $serviciosFinalizados[] = $row;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servicios Solicitados</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="progreso.css">
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
        <h2 class="text-center mb-4">Servicios Solicitados</h2>

        <!-- Pestañas -->
        <ul class="nav nav-tabs" id="serviceTabs" role="tablist">
            <li class="nav-item">
                <button class="nav-link active" id="pendientes-tab" data-bs-toggle="tab" data-bs-target="#pendientes" type="button" role="tab" aria-controls="pendientes" aria-selected="true">Pendientes</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="finalizados-tab" data-bs-toggle="tab" data-bs-target="#finalizados" type="button" role="tab" aria-controls="finalizados" aria-selected="false">Finalizados</button>
            </li>
        </ul>

        <!-- Contenido de las pestañas -->
        <div class="tab-content">
            <div class="tab-pane fade show active" id="pendientes" role="tabpanel" aria-labelledby="pendientes-tab"></div>
            <div class="tab-pane fade" id="finalizados" role="tabpanel" aria-labelledby="finalizados-tab"></div>
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
    <!-- Pasar datos PHP a JavaScript -->
    <script>
        const serviciosPendientes = <?= json_encode($serviciosPendientes); ?>;
        const serviciosFinalizados = <?= json_encode($serviciosFinalizados); ?>;
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="progreso.js"></script>
</body>
</html>
