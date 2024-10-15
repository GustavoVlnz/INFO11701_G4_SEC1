<?php
session_start(); // Iniciar la sesión

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verificar si ya hay calificaciones almacenadas
if (!isset($_SESSION['calificaciones'])) {
    $_SESSION['calificaciones'] = []; // Inicializar si no existe
}

// Procesar la entrada del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $usuario = $_POST['usuario'];
    $comentario = $_POST['comentario'];
    $calificacion = $_POST['calificacion'];

    // Agregar nueva calificación al arreglo de la sesión
    $_SESSION['calificaciones'][] = [
        "usuario" => $usuario,
        "fecha" => date("d/m/Y"), // Fecha actual en formato dd/mm/yyyy
        "comentario" => $comentario,
        "calificacion" => $calificacion
    ];
}

// Calcular calificación promedio
$totalCalificaciones = 0;
foreach ($_SESSION['calificaciones'] as $calificacion) {
    $totalCalificaciones += $calificacion["calificacion"];
}
$promedioCalificacion = count($_SESSION['calificaciones']) > 0 ? $totalCalificaciones / count($_SESSION['calificaciones']) : 0;

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reseñas y Calificaciones</title>
    <style>
        .reseñas {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .icono {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .icono img {
            width: 40px;
            margin-right: 10px;
        }
        .calificaciones {
            margin-top: 20px;
        }
        .reseña {
            margin-top: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fff;
        }
        form {
            margin-top: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        textarea {
            width: 100%;
            height: 60px;
            margin-bottom: 10px;
        }
        input[type="text"],
        input[type="number"] {
            width: 100%;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"] {
            background-color: #37b5ff;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 15px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #28a745;
        }
    </style>
</head>
<body>
    <div class="reseñas">
        <div class="icono">
            <img src="../images/review.png" alt="Reseñas">
            <h2>Reseñas y Calificaciones</h2>
        </div>

        <div class="calificaciones">
            <div class="resumen">
                <h3>Calificación Promedio:</h3>
                <p class="promedio"><?php echo number_format($promedioCalificacion, 1); ?>/5</p>
                <p class="total-reseñas">(<?php echo count($_SESSION['calificaciones']); ?> reseñas)</p>
            </div>

            <?php foreach ($_SESSION['calificaciones'] as $reseña): ?>
                <div class="reseña">
                    <h4><?php echo htmlspecialchars($reseña["usuario"]); ?></h4>
                    <p class="fecha"><?php echo htmlspecialchars($reseña["fecha"]); ?></p>
                    <p class="comentario"><?php echo htmlspecialchars($reseña["comentario"]); ?></p>
                </div>
            <?php endforeach; ?>
        </div>

        <form method="post" action="">
            <label for="usuario">Nombre:</label>
            <input type="text" name="usuario" required>
            
            <label for="calificacion">Calificación (0-5):</label>
            <input type="number" name="calificacion" min="0" max="5" step="0.1" required>
            
            <label for="comentario">Comentario:</label>
            <textarea name="comentario" required></textarea>
            
            <input type="submit" value="Agregar Calificación">
        </form>
    </div>
</body>
</html>
