<?php
// Conexión a la base de datos
$servername = "db.inf.uct.cl";
$username = "acarrasco";
$password = "Hellovro2019@";
$dbname = "A2024_acarrasco";

$db = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($db->connect_error) {
    die("Conexión fallida: " . $db->connect_error);
}

// Consulta para obtener los servicios
$sql = "SELECT nombre, precio, imagen FROM servicios WHERE categoria = 'Consultoría y Asesoría'"; // Cambia según la categoría que estés buscando
$result = $db->query($sql);
?>

<main>
    <div class="servicios">
        <?php
        if ($result->num_rows > 0) {
            // Mostrar cada servicio
            while ($row = $result->fetch_assoc()) {
                echo '<div class="servicio">';
                echo '<img src="' . htmlspecialchars($row['imagen']) . '" alt="' . htmlspecialchars($row['nombre']) . '">';
                echo '<h3>' . htmlspecialchars($row['nombre']) . '</h3>';
                echo '<p>Precio: $' . number_format($row['precio'], 0, ',', '.') . ' CLP</p>';
                echo '<button onclick="agregarServicio(\'' . htmlspecialchars($row['nombre']) . '\', ' . $row['precio'] . ')">Agregar</button>';
                echo '</div>';
            }
        } else {
            echo '<p>No hay servicios disponibles.</p>';
        }
        ?>
    </div>

    <div class="pedido">
        <h2>Tu Pedido</h2>
        <ul id="lista-pedido"></ul>
        <button onclick="window.location.href='carpetaAmigo/confirmacion.html'">Confirmar Pedido</button>
        <button onclick="window.location.href='categorias.html'">Volver a Categorías</button>
    </div>
</main>

<?php
// Cerrar la conexión
$db->close();
?>
