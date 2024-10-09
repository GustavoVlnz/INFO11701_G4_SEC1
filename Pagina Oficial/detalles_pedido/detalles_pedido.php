<?php
include 'conexion.inc';
// Obtener el ID del servicio (puede venir de una URL o formulario)
$servicio_id = isset($_GET['id']) ? $_GET['id'] : 1; // Ejemplo: por defecto el ID es 1

// Consulta para obtener los detalles del servicio
$sql = "SELECT servicio.Descripcion AS servicio_descripcion, servicio.PrecioUnitario AS servicio_precio, 
        tienda.NOMemp AS tienda_nombre, tienda.Descripcion AS tienda_descripcion, 
        tienda.Contacto AS tienda_contacto, tienda.RRSS AS tienda_rrss
        FROM servicio 
        JOIN tienda ON servicio.IDProv = tienda.IDtienda
        WHERE servicio.IDcontrato = ?"; //simbolo ? es un placeholder, que se llena mas tarde con el valor real.

$stmt = $db->prepare($sql); //Prepara la consulta SQL utilizando la conexión a la base de datos
$stmt->bind_param("i", $servicio_id); //asocia el valor real de $servicio_id con el ? que estaba en la consulta SQL.
$stmt->execute();
$result = $stmt->get_result(); //Recupera los resultados de la consulta 

// Verificar si se encontró el servicio
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Asignar los valores de la consulta a variables
    $servicio_nombre = $row['servicio_nombre'];
    $servicio_descripcion = $row['servicio_descripcion'];
    $servicio_precio = $row['servicio_precio'];
    $proveedor_nombre = $row['proveedor_nombre'];
    $proveedor_email = $row['proveedor_email'];
    $proveedor_telefono = $row['proveedor_telefono'];
} else {
    echo "No se encontraron detalles para el servicio.";
    exit;
}

$stmt->close();
$db->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Pedido</title>
    <link rel="stylesheet" href="detalles_pedido.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="../images/icon.jpg" alt="Logo">
            <h1>Movo</h1>
        </div>
        <nav>
            <a href="/Pagina Oficial/Home/home.html">Inicio</a>
            <a href="/Pagina Oficial/categorias/categorias.html" class="active">Servicios</a>
            <a href="/Pagina Oficial/Perfil/InfoAcc/Info.html">Perfil</a>
        </nav>
        <div class="cerrar_sesion">
            <img src="../images/logout.png" alt="Cerrar Sesión">
        </div>
    </header>

    <div class="container">
        <div class="detalles_pedido">
            <div class="icono">
                <img src="../images/service.png" alt="Icono Servicio">
                <h2>Detalles del Servicio</h2>
            </div>

            <div class="pedido">
                <!-- Usar las variables obtenidas de PHP para llenar los datos del servicio -->
                <h3 id="servicio-nombre"><?php echo $servicio_nombre; ?></h3>
                <p id="servicio-descripcion"><?php echo $servicio_descripcion; ?></p>

                <div class="info-proveedor">
                    <h4>Datos del proveedor:</h4>
                    <p><strong>Nombre:</strong> <span id="proveedor-nombre"><?php echo $proveedor_nombre; ?></span></p>
                    <p><strong>Email:</strong> <span id="proveedor-email"><?php echo $proveedor_email; ?></span></p>
                    <p><strong>Teléfono:</strong> <span id="proveedor-telefono"><?php echo $proveedor_telefono; ?></span></p>
                </div>

                <div class="precio">
                    <h4>Precio:</h4>
                    <p id="servicio-precio"><?php echo "$" . number_format($servicio_precio, 0, ',', '.'); ?> CLP</p>
                </div>

                <button class="horarios_btn" id="ver_horarios">Ver Horarios Disponibles</button>
                <input type="text" id="calendario" placeholder="Selecciona una fecha">
                <button class="contratar">Contratar servicio</button>
            </div>
        </div>
    </div>

    <div class="reseñas">
        <div class="icono">
            <img src="../images/review.png" alt="Reseñas">
            <h2>Reseñas y Calificaciones</h2>
        </div>

        <div class="calificaciones">
            <div class="resumen">
                <h3>Calificación Promedio:</h3>
                <p class="promedio">4.5/5</p>
                <p class="total-reseñas">(25 reseñas)</p>
            </div>

            <div class="reseña">
                <h4>Javier Janito</h4>
                <p class="fecha">10/09/2024</p>
                <p class="comentario">¡Excelente servicio! El proveedor fue muy profesional y cumplió con todas mis expectativas.</p>
            </div>
        </div>
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
                <a href="/Pagina Oficial/politica y privacidad/politica y privacidad.html">Política de Privacidad</a>
                <a href="/Pagina Oficial/Registro/terminos.html">Términos de Servicio</a>
            </div>
        </div>
        <div class="copyright_footer">
            <p>&copy; 2024 MOVO. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="detalles_pedido.js"></script>
</body>
</html>
