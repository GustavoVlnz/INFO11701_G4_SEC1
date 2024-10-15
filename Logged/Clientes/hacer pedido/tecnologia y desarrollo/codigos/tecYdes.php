<?php
include("conexphp"); 

$id_categoria = 4;
$sql = "SELECT nombre_servicio, descripcion, precio FROM serviciosMOVO WHERE id_categoria = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_categoria);
$stmt->execute();
$result = $stmt->get_result();

// Generar los servicios dinámicamente en HTML
while ($row = $result->fetch_assoc()) {
    echo '<div class="servicio">';
    echo '<img src="../imagenes/' . strtolower(str_replace(' ', '_', $row['nombre_servicio'])) . '.png" alt="' . $row['nombre_servicio'] . '">';
    echo '<h3>' . $row['nombre_servicio'] . '</h3>';
    echo '<p>Precio: $' . $row['precio'] . ' CLP</p>';
    echo '<button onclick="agregarServicio(\'' . $row['nombre_servicio'] . '\', ' . $row['precio'] . ')">Agregar</button>';
    echo '</div>';
}

$stmt->close();
$conn->close();
?>
