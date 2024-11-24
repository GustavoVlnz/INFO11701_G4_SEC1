// Función para actualizar el estado de un comentario
function actualizarEstado(boton, nuevoEstado) {
    // Obtener la fila donde se encuentra el botón
    const fila = boton.closest("tr");
    // Buscar la celda de estado en esa fila
    const celdaEstado = fila.querySelector(".estado");
    // Actualizar el estado
    celdaEstado.textContent = nuevoEstado;

    // Opcional: Cambiar el estilo según el estado
    if (nuevoEstado === "Aprobado") {
        celdaEstado.style.color = "green";
    } else if (nuevoEstado === "Rechazado") {
        celdaEstado.style.color = "red";
    }
}

// Función para eliminar un comentario
function eliminarComentario(boton) {
    // Confirmar eliminación
    if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
        // Eliminar la fila completa
        const fila = boton.closest("tr");
        fila.remove();
    }
}
