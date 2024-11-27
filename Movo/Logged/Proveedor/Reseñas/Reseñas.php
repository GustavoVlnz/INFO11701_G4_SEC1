<?php
include 'conexion.php';

// Consulta para obtener las reseñas donde `comentado` es "si"
$sql = "SELECT calificacion, reseña, id_cliente FROM Servicios_CompletadosMOVO WHERE comentado = 'si'";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reseñas</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="Reseñas.css">
</head>
<body>
    <header class="header d-flex align-items-center justify-content-between p-3 bg-white">
        <div class="d-flex align-items-center">
            <img src="../../Clientes/Perfil/Images/logo.png" alt="Logo de la empresa" class="logo mr-3">
            <h1 class="titulo-empresa mb-0">MOVO</h1>
        </div>
        <nav class="nav justify-content-center flex-grow-1">
            <ul class="nav">
                <li class="nav-item"><a href="../../Clientes/HomeLogeado/home.html" class="nav-link">INICIO</a></li>
                <li class="nav-item"><a href="../../Clientes/categorias/categorias.html" class="nav-link">SERVICIOS</a></li>
                <li class="nav-item"><a href="#" class="nav-link">PERFIL</a></li>
            </ul>
        </nav>
    </header>

    <div class="mb-4 shadow-sm p-4 bg-white">
        <h2>Últimas Reseñas Recibidas</h2>

        <?php
        if ($result->num_rows > 0) {
            // Iterar sobre los resultados y mostrarlos
            while ($row = $result->fetch_assoc()) {
                $estrellas = str_repeat("⭐", $row['calificacion']);
                echo "<div class='review-item mb-3 p-3 border rounded'>";
                echo "<div class='d-flex justify-content-between'>";
                echo "<p><strong>Autor:</strong> Cliente " . $row['id_cliente'] . "</p>";
                echo "<p><strong>Calificación:</strong> $estrellas</p>";
                echo "</div>";
                echo "<p><strong>Reseña:</strong> " . htmlspecialchars($row['reseña']) . "</p>";
                echo "</div>";
            }
        } else {
            echo "<p>No hay reseñas disponibles.</p>";
        }

        $conn->close();
        ?>
    </div>

    <footer class="text-white p-4 mt-4">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-4">
                    <h3>Contacto</h3>
                    <a href="mailto:Movocompanycontact@gmail.com" class="text-white">Movocompanycontact@gmail.com</a>
                </div>
                <div class="col-md-4">
                    <h3>Redes Sociales</h3>
                    <a href="https://www.facebook.com/profile.php?id=61566403465579" class="text-white d-block">Facebook</a>
                    <a href="https://x.com/CompanyMovo_inc" class="text-white d-block">Twitter</a>
                    <a href="https://www.instagram.com/movo_inc/" class="text-white d-block">Instagram</a>
                </div>
                <div class="col-md-4">
                    <h3>Información Legal</h3>
                    <a href="../../../InicioSesion-Registro/politica y privacidad/politica y privacidad.html" class="text-white d-block">Política de Privacidad</a>
                    <a href="../../../InicioSesion-Registro/Registro/terminos.html" class="text-white d-block">Términos de Servicio</a>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <p>&copy; 2024 MOVO. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>
