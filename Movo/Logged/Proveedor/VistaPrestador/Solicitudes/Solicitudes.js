// Función para cambiar el estado de un servicio
function cambiarEstado(boton, nuevoEstado) {
    const fila = boton.closest('tr'); // Encuentra la fila
    const estadoSpan = fila.querySelector('.status'); // Encuentra el span del estado

    if (nuevoEstado === 'aceptado') {
        estadoSpan.textContent = 'Aceptado'; // Cambia el texto a 'Aceptado'
        estadoSpan.className = 'status status-accepted'; // Actualiza la clase
        moverFila(fila, 'tabla-aceptados'); // Mueve la fila a la tabla de aceptados
        agregarBotonCompletar(fila); // Añade el botón para marcar como completado
    } else if (nuevoEstado === 'rechazado') {
        estadoSpan.textContent = 'Rechazado'; // Cambia el texto a 'Rechazado'
        estadoSpan.className = 'status status-canceled'; // Actualiza la clase
        moverFila(fila, 'tabla-rechazados'); // Mueve la fila a la tabla de rechazados
        quitarBotones(fila); // Elimina los botones de acción
    } else if (nuevoEstado === 'completado') {
        estadoSpan.textContent = 'Completado'; // Cambia el texto a 'Completado'
        estadoSpan.className = 'status status-completed'; // Actualiza la clase
        moverFila(fila, 'tabla-completados'); // Mueve la fila a la tabla de completados
        quitarBotones(fila); // Elimina los botones de acción
    }
}

// Función para mover una fila de una tabla a otra
function moverFila(fila, idTablaDestino) {
    const tablaDestino = document.getElementById(idTablaDestino).querySelector('tbody'); // Selecciona la tabla destino
    tablaDestino.appendChild(fila); // Mueve la fila a la tabla destino
}

// Función para agregar el botón "Marcar como Completado"
function agregarBotonCompletar(fila) {
    const accionesTd = fila.querySelector('td:last-child'); // Encuentra la columna de acciones
    accionesTd.innerHTML = `
        <button class="btn btn-completar" onclick="cambiarEstado(this, 'completado')">Marcar como Completado</button>
    `; // Inserta el nuevo botón
}

// Función para eliminar los botones de acción
function quitarBotones(fila) {
    const accionesTd = fila.querySelector('td:last-child'); // Encuentra la columna de acciones
    accionesTd.innerHTML = ''; // Elimina los botones de acción
}
