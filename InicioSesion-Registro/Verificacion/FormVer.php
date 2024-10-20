<?php
include "ConexVer.php"; // Incluir la conexión a la base de datos

// Variables para mostrar los datos ingresados
$nombre_tienda = $direccion = $telefono = $correo = $descripcion = $redes_sociales = "";

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar los valores del formulario
    $nombre_tienda = $db->real_escape_string($_POST['NombreTienda']);
    $direccion = $db->real_escape_string($_POST['Direccion']);
    $telefono = $db->real_escape_string($_POST['Contacto']);
    $correo = $db->real_escape_string($_POST['Correo']);
    $descripcion = $db->real_escape_string($_POST['Descripcion']);
    $redes_sociales = $db->real_escape_string($_POST['Socials']);

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO FormVerificacionMOVO (nombre_tienda, direccion, contacto, correo, descripcion, redes_sociales)
            VALUES ('$nombre_tienda', '$direccion', '$telefono', '$correo', '$descripcion', '$redes_sociales')";

    // Ejecutar la consulta y verificar si fue exitosa
    if ($db->query($sql) === TRUE) {
        $mensaje = "Datos enviados correctamente";
    } else {
        $mensaje = "Error al guardar los datos: " . $db->error;
    }
    // Cerrar la conexión
    $db->close();
} else {
    $mensaje = "No se ha enviado ningún formulario.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Envío</title>
    <link rel="stylesheet" href="FormVerConfirmacion.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="../../images/logo.png" alt="Logo Movo">
            <h1>MOVO</h1>
        </div>
        <nav>
            <a href="../../Logged/Clientes/HomeLogeado/home.html">Inicio</a>
            <a href="../../Logged/Clientes/categorias/categorias.html">Servicios</a>
        </nav>
        <div class="salir">
            <img src="../../images/salir.png" alt="Salir">
        </div>
    </header>

    <div id="Box_Confirmacion">
        <h2><?php echo $mensaje; ?></h2>
        <?php if (!empty($nombre_tienda)): ?>
            <p>Los siguientes datos fueron ingresados:</p>
            <ul>
                <li><strong>Nombre de la tienda/negocio:</strong> <?php echo htmlspecialchars($nombre_tienda); ?></li>
                <li><strong>Dirección:</strong> <?php echo htmlspecialchars($direccion); ?></li>
                <li><strong>Teléfono de contacto:</strong> <?php echo htmlspecialchars($telefono); ?></li>
                <li><strong>Correo electrónico:</strong> <?php echo htmlspecialchars($correo); ?></li>
                <li><strong>Descripción de servicios:</strong> <?php echo htmlspecialchars($descripcion); ?></li>
                <li><strong>Redes sociales:</strong> <?php echo htmlspecialchars($redes_sociales); ?></li>
            </ul>
        <?php endif; ?>
        <a href="../../Logged/Clientes/HomeLogeado/home.html" class="boton">Volver al Inicio</a>
    </div>

    <footer>
        <div class="contenido-footer">
            <div class="contacto">
                <h3>Contacto</h3>
                <a href="mailto:Movocompanycontact@gmail.com?Subject=Ingrese%20el%20asunto">Email: Movocompanycontact@gmail.com</a>
            </div>
            <div class="redes-sociales">
                <h3>Redes Sociales</h3>
                <a href="https://www.facebook.com/profile.php?id=61566403465579" class="social-icon">Facebook</a>
                <a href="https://x.com/CompanyMovo_inc" class="social-icon">Twitter</a>
                <a href="https://www.instagram.com/movo_inc/" class="social-icon">Instagram</a>
            </div>
            <div class="info-legal">
                <h3>Información Legal</h3>
                <a href="../politica y privacidad/politica y privacidad.html">Política de Privacidad</a>
                <a href="../Registro/terminos.html">Términos de Servicio</a>
            </div>
        </div>
        <div class="copyright_footer">
            <p>&copy; 2024 MOVO. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>
