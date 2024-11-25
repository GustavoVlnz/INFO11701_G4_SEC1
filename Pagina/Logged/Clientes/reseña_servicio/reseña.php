<?php
// Conexión a la base de datos
$conn = new mysqli("db.inf.uct.cl", "acarrasco", "Hellovro2019@", "A2024_acarrasco");
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

session_start();
$idUsuario = $_SESSION['idUsuarios'];

// Consulta para obtener servicios completados pero no comentados
$sql = "SELECT id_completado, id_servicio, servicio_completado, id_cliente 
        FROM Servicios_CompletadosMOVO 
        WHERE id_cliente = ? AND comentado = 'no'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$result = $stmt->get_result();
$servicios = $result->fetch_all(MYSQLI_ASSOC); // Obtener todos los servicios como un array
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reseñas de Servicios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="reseña.css">
</head>
<body>
<div class="container mt-5">
    <h1 class="text-center mb-4">Reseña y Calificación de Servicios</h1>

    <?php if (count($servicios) > 0): ?>
        <!-- Formulario General -->
        <form action="procesar_reseña.php" method="POST">
            <!-- Carousel de Servicios -->
            <div id="carouselServicios" class="carousel slide" data-bs-ride="carousel">
                <!-- Indicadores del Carrusel -->
                <div class="carousel-indicators">
                    <?php foreach ($servicios as $index => $servicio): ?>
                        <button type="button" data-bs-target="#carouselServicios" data-bs-slide-to="<?= $index ?>"
                                class="<?= $index === 0 ? 'active' : '' ?>" aria-current="<?= $index === 0 ? 'true' : 'false' ?>"
                                aria-label="Slide <?= $index + 1 ?>"></button>
                    <?php endforeach; ?>
                </div>

                <!-- Contenido del Carrusel -->
                <div class="carousel-inner">
                    <?php foreach ($servicios as $index => $servicio): ?>
                        <div class="carousel-item <?= $index === 0 ? 'active' : '' ?>">
                            <div class="row justify-content-center">
                                <div class="col-md-8">
                                    <div class="card shadow-lg servicio-card">
                                        <div class="card-body">
                                            <h5 class="card-title">Servicio: <?= htmlspecialchars($servicio['servicio_completado']) ?></h5>
                                            <input type="hidden" name="id_completado[]" value="<?= $servicio['id_completado'] ?>">
                                            <div class="mb-3">
                                                <label for="calificacion_<?= $servicio['id_completado'] ?>" class="form-label">Calificación (1-5)</label>
                                                <select name="calificacion[]" id="calificacion_<?= $servicio['id_completado'] ?>" class="form-select" required>
                                                    <option value="" disabled selected>Seleccionar</option>
                                                    <option value="1">1 - Muy malo</option>
                                                    <option value="2">2 - Malo</option>
                                                    <option value="3">3 - Regular</option>
                                                    <option value="4">4 - Bueno</option>
                                                    <option value="5">5 - Excelente</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="reseña_<?= $servicio['id_completado'] ?>" class="form-label">Reseña (Opcional)</label>
                                                <textarea name="reseña[]" id="reseña_<?= $servicio['id_completado'] ?>" class="form-control" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Controles del Carrusel -->
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselServicios" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselServicios" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>

            <!-- Botón General -->
            <div class="text-center mt-4">
                <button type="submit" class="btn btn-success btn-lg">Enviar Reseñas</button>
            </div>
        </form>
    <?php else: ?>
        <!-- Mensaje si no hay servicios -->
        <p class="text-center">No hay servicios pendientes por calificar.</p>
    <?php endif; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="reseña.js"></script>
</body>
</html>
