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