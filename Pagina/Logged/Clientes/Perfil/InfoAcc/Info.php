<?php
session_start();

// Comprobar si el usuario ha iniciado sesión
if (!isset($_SESSION['idUsuarios'])) {
    header("Location: ../../Login/Login.html"); // Redirigir al login si no ha iniciado sesión
    exit();
}

// Incluir archivo de conexión a la base de datos
include 'conexion.inc';  

// Obtener el ID del usuario desde la sesión
$user_id = $_SESSION['idUsuarios'];

// Preparar la consulta para obtener los datos del usuario
$sql = "SELECT nombres, apellidos, rut, genero, email, direccion, telefono FROM usuariosMOVO WHERE idUsuarios = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
} else {
    echo "Error: No se encontró el usuario.";
    $usuario = null; // Asegúrate de que la variable esté definida, incluso si no se encuentra el usuario
}

// Si $usuario contiene datos, muestra la información. Si no, muestra un mensaje de error
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-..." crossorigin="anonymous">
    <link rel="stylesheet" href="Info.css">
</head>
<body>
    <header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div class="d-flex align-items-center" id="logo">
          <img src="../Images/logo.png" alt="Logo Movo" class="me-2">
          <h1 class="m-0">MOVO</h1>
        </div>
        <nav>
          <a href="../../HomeLogeado/home.html" >Inicio</a>
          <a href="../../categorias/categorias.html" >Servicios</a>
        </nav>
        <div id="logo-salir">
          <a href="../../../../HomeSinLogear/home.html">
          <img src="../Images/logout.png" alt="Salir" style="width: 50px;">
          </a>
        </div>
    </header>

    <div id="perfil" class="container-fluid d-flex my-5">
    <section class="sidebar bg-primary text-white p-4">
        <ul class="list-unstyled">
            <li><a href="#" class="text-white d-block py-2">Información de la cuenta</a></li>
            <li><a href="../Seguridad/Seguridad.html" class="text-white d-block py-2">Seguridad</a></li>
            <li><a href="../HistorialServ/HistSev.html" class="text-white d-block py-2">Historial de servicios</a></li>
        </ul>
    </section>

    <section class="info-perfil bg-white shadow-sm p-4 ms-3">
        <div class="header-perfil d-flex align-items-center mb-4">
            <a href="#"><img src="../Images/user.png" alt="Foto de perfil" class="foto-perfil img-thumbnail"></a>
        </div>
        <div class="detalles">
            <h3>Información del Cliente</h3>
            <p><b>Nombre:</b> <input type="text" id="nombres" value="<?php echo htmlspecialchars($usuario['nombres']); ?>" disabled></p>
            <p><b>Apellido:</b> <input type="text" id="apellidos" value="<?php echo htmlspecialchars($usuario['apellidos']); ?>" disabled></p>
            <p><b>RUT:</b> <input type="text" id="rut" value="<?php echo htmlspecialchars($usuario['rut']); ?>" disabled readonly></p>
            <p><b>Género:</b> 
                <select id="genero" disabled>
                    <option value="Masculino" <?php if ($usuario['genero'] == 'Masculino') echo 'selected'; ?>>Masculino</option>
                    <option value="Femenino" <?php if ($usuario['genero'] == 'Femenino') echo 'selected'; ?>>Femenino</option>
                    <option value="Otro" <?php if ($usuario['genero'] == 'Otro') echo 'selected'; ?>>Otro</option>
                </select>
            </p>
            <p><b>Correo electrónico:</b> <input type="email" id="email" value="<?php echo htmlspecialchars($usuario['email']); ?>" disabled></p>
            <p><b>Dirección:</b> <input type="text" id="direccion" value="<?php echo htmlspecialchars($usuario['direccion']); ?>" disabled></p>
            <p><b>Teléfono:</b> <input type="text" id="telefono" value="<?php echo htmlspecialchars($usuario['telefono']); ?>" disabled placeholder="+569" maxlength="12" required pattern="^\+56 9 \d{4} \d{4}$" oninput="validarTelefono(this)"></p>

            <div class="botones">
                <button onclick="habilitarEdicion()">Editar Perfil</button>
                <button onclick="guardarCambios()" style="display: none;" id="guardarBtn">Guardar Cambios</button>
            </div>
        </div>
    </section>
    </div>

<!-- Contenedor para el Toast -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div id="toast-header" class="toast-header">
                <img src="Images/logo.png" class="rounded me-2 img-fluid" alt="Logo MOVO" style="width: 40px; height: 40px;">
                <strong class="me-auto">MOVO</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" id="toastMessage">
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>


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
                <a href="../../../../InicioSesion-Registro/politica y privacidad/politica y privacidad.html" class="contenido-footer">Política de Privacidad</a><br>
                <a href="../../../../InicioSesion-Registro/Registro/terminos.html" class="contenido-footer">Términos de Servicio</a>
            </div>
        </div>
        <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
    </div>
</footer>
<script src="Info.js"></script>

    
</body>
</html>
