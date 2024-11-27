<?php
session_start();

// Si no hay email en sesión o el usuario ingresa a la página directamente
if (!isset($_SESSION['email']) || (isset($_POST['email']) && $_POST['email'] !== $_SESSION['email'])) {
    // Reiniciar las variables de sesión relacionadas con la verificación
    unset($_SESSION['codigo'], $_SESSION['mensajeExito'], $_SESSION['mensajeError']);
    $_SESSION['email'] = $_POST['email'] ?? '';
}

// Obtener mensajes y email actual
$mensajeExito = $_SESSION['mensajeExito'] ?? '';
$mensajeError = $_SESSION['mensajeError'] ?? '';
$emailGuardado = $_SESSION['email'];
$mostrarCodigo = isset($_SESSION['codigo']);
unset($_SESSION['mensajeExito'], $_SESSION['mensajeError']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autenticación</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="stylesheet" href="Autenticacion.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div class="d-flex align-items-center" id="logo">
          <img src="../../Images/logo.png" alt="Logo Movo" class="me-2" style="width: 50px;">
          <h1 class="m-0">MOVO</h1>
        </div>
        <nav>
            <a href="../../../../HomeLogeado/home.html">Inicio</a>
            <a href="../../../../categorias/categorias.html">Servicios</a>
            <a href="../../../InfoAcc/Info.php">Perfil</a>
        </nav>
        <div id="logo-salir">
          <img src="../../Images/logout.png" alt="Salir" style="width: 50px;">
        </div>
    </header>

    <div id="perfil" class="d-flex p-4">
        <section class="sidebar bg-primary text-white p-4">
            <ul class="list-unstyled">
                <li><a href="../../../InfoAcc/Info.php" class="text-white d-block py-2 sidebar-link">Información de la cuenta</a></li>
                <li><a href="../../Seguridad.html" class="text-white d-block py-2 sidebar-link">Seguridad</a></li>
                <li><a href="../../../HistorialServ/HistSev.html" class="text-white d-block py-2 sidebar-link">Historial de servicios</a></li>
            </ul>
        </section>
    
        <section class="info-seguridad flex-grow-1 bg-white p-4 ms-3 shadow-sm rounded">
            <div class="header-seguridad mb-4">
                <h1>Verificación de Cuenta</h1>
            </div>
            <div>
                <!-- Formulario para el email -->
                <?php if (!$mostrarCodigo): ?>
                    <form method="POST" action="VerificarCuenta.php" class="mb-4">
                        <label for="email" class="form-label">Correo Electrónico:</label>
                        <input type="email" name="email" id="email" class="form-control mb-2" required>
                        <button type="submit" name="enviarCorreo" class="btn btn-primary">Enviar Código</button>
                    </form>
                <?php else: ?>
                    <!-- Formulario para el código -->
                    <p>Se envió un código al correo: <strong><?php echo htmlspecialchars($emailGuardado); ?></strong></p>
                    <form method="POST" action="VerificarCuenta.php">
                        <label for="codigo" class="form-label">Código de Verificación:</label>
                        <input type="text" name="codigo" id="codigo" class="form-control mb-2" required>
                        <button type="submit" name="verificarCodigo" class="btn btn-success">Verificar</button>
                    </form>
                <?php endif; ?>

                <!-- Mensajes de error o éxito -->
                <?php if ($mensajeExito): ?>
                    <p class="text-success"><?php echo htmlspecialchars($mensajeExito); ?></p>
                <?php elseif ($mensajeError): ?>
                    <p class="text-danger"><?php echo htmlspecialchars($mensajeError); ?></p>
                <?php endif; ?>
            </div>
        </section>
    </div>
    
    <footer class="mt-auto text-white text-center py-4">
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
<script src="Autenticacion.js"></script>
</body>
</html>
