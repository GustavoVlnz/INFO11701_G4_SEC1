<?php
// Iniciar sesión para obtener el ID del usuario actual
session_start();

// Comprobar si el usuario ha iniciado sesión
if (!isset($_SESSION['IDuser'])) {
    header("Location: ../../Login/Login.html"); // Redirigir al login si no ha iniciado sesión
    exit();
}

// Incluir archivo de conexión a la base de datos
include 'conexion.inc';  

// Obtener el ID del usuario desde la sesión
$user_id = $_SESSION['IDuser'];

// Preparar la consulta para obtener los datos del usuario
$sql = "SELECT nombres, apellidos, rut, genero, email, direccion, telefono FROM usuarios WHERE idUsuarios = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
} else {
    echo "Error: No se encontró el usuario.";
    exit();
}

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
          <img src="../Images/logo.png" alt="Logo Movo" class="me-2" ">
          <h1 class="m-0">MOVO</h1>
        </div>
        <nav>
          <a href="#" >Inicio</a>
          <a href="#" >Servicios</a>
        </nav>
        <div id="logo-salir">
          <img src="../Images/logout.png" alt="Salir" style="width: 50px;">
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
    
        <section class="info-perfil flex-grow-1 bg-white shadow-sm p-4 ms-3">
            <div class="header-perfil d-flex align-items-center mb-4">
                <a href="#"><img src="../Images/user.png" alt="Foto de perfil" class="foto-perfil img-thumbnail"></a>
                <h2 class="ms-3"><?php echo htmlspecialchars($usuario['nombre'] . " " . $usuario['apellido']); ?></h2>
            </div>
            <div class="detalles">
                <h3>Información</h3>
                <p><b>Nombre:</b> <input type="text" id="nombre" value="<?php echo htmlspecialchars($usuario['nombres']); ?>" disabled></p>
                <p><b>Apellido:</b> <input type="text" id="apellido" value="<?php echo htmlspecialchars($usuario['apellidos']); ?>" disabled></p>
                <p><b>RUT:</b> <input type="text" id="rut" value="<?php echo htmlspecialchars($usuario['rut']); ?>" disabled readonly></p>
                <p><b>Género:</b> <input type="text" id="genero" value="<?php echo htmlspecialchars($usuario['genero']); ?>" disabled></p>
                <p><b>Correo electrónico:</b> <input type="email" id="email" value="<?php echo htmlspecialchars($usuario['email']); ?>" disabled></p>
                <p><b>Dirección:</b> <input type="text" id="direccion" value="<?php echo htmlspecialchars($usuario['direccion']); ?>" disabled></p>
                <p><b>Teléfono:</b> <input type="text" id="telefono" value="<?php echo htmlspecialchars($usuario['telefono']); ?>" disabled></p>
        
                <button onclick="habilitarEdicion()">Editar Perfil</button>
                <button onclick="guardarCambios()" style="display: none;" id="guardarBtn">Guardar Cambios</button>
            </div>
        </section>
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
                <a href="/Pagina Oficial/politica y privacidad/politica y privacidad.html" class="contenido-footer">Política de Privacidad</a><br>
                <a href="/Pagina Oficial/Registro/terminos.html" class="contenido-footer">Términos de Servicio</a>
            </div>
        </div>
        <p class="mt-3">&copy; 2024 MOVO. Todos los derechos reservados.</p>
    </div>
</footer>
<script src="Info.js"></script>

    
</body>
</html>