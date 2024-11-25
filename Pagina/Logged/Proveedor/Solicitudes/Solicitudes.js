// Función para capitalizar la primera letra de una palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Función que llama a Solicitudes.php y obtiene los datos de los servicios
function cargarServicios() {
    fetch('Solicitudes.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Limpiar las tablas
                limpiarTablas();

                // Recorrer los servicios y colocarlos en la tabla correspondiente
                data.data.forEach(servicio => {
                    const fila = crearFilaServicio(servicio);
                    if (servicio.estado.toLowerCase() === 'pendiente') {
                        document.querySelector('#tabla-pendientes tbody').appendChild(fila);
                    } else if (servicio.estado.toLowerCase() === 'finalizado') {
                        document.querySelector('#tabla-completados tbody').appendChild(fila);
                    }
                });
            } else {
                console.error('Error al cargar los servicios:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

// Función para crear una fila de servicio
function crearFilaServicio(servicio) {
    const tr = document.createElement('tr');

    // Formato de fecha: solo la parte de la fecha (sin la hora)
    const soloFecha = servicio.fecha.split(' ')[0];

    tr.innerHTML = `
        <td>#${servicio.id_solicitud}</td> <!-- N° de Solicitud -->
        <td>${servicio.id_solicitante}</td> <!-- ID del Solicitante -->
        <td>${soloFecha}</td> <!-- Fecha sin hora -->
        <td>${servicio.nombre_servicio}</td> <!-- Nombre del Servicio -->
        <td><span class="status ${getStatusClass(servicio.estado)}">${capitalize(servicio.estado)}</span></td>
        <td>${crearAcciones(servicio.estado, servicio.id_solicitud)}</td> <!-- Acciones basadas en id_solicitud -->
    `;

    return tr;
}

// Función para obtener la clase de estilo correspondiente al estado
function getStatusClass(estado) {
    switch (estado.toLowerCase()) {
        case 'pendiente':
            return 'status-pending';
        case 'finalizado':
            return 'status-completed';
        default:
            return '';
    }
}

// Función para crear los botones de acción según el estado
function crearAcciones(estado, idSolicitud) {
    if (estado.toLowerCase() === 'pendiente') {
        return `<button class="btn btn-primary btn-sm" onclick="cambiarEstado(this, 'realizado', ${idSolicitud})">Marcar como Completado</button>`;
    }
    return ''; // No hay acciones para servicios ya realizados
}

// Función para limpiar todas las tablas antes de cargar los servicios
function limpiarTablas() {
    document.querySelector('#tabla-pendientes tbody').innerHTML = '';
    document.querySelector('#tabla-completados tbody').innerHTML = '';
}

// Función para cambiar el estado de un servicio
function cambiarEstado(boton, nuevoEstado, idSolicitud) {
    fetch('cambiar_estado.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idSolicitud})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const fila = boton.closest('tr');
            const estadoSpan = fila.querySelector('.status');

            // Actualizar el texto y la clase del estado
            estadoSpan.textContent = capitalize(nuevoEstado);
            estadoSpan.className = 'status ' + getStatusClass(nuevoEstado);

            // Mover la fila a la tabla de completados
            if (nuevoEstado.toLowerCase() === 'finalizado') {
                document.querySelector('#tabla-completados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = ''; // Elimina las acciones
            }
        } else {
            alert('Error al cambiar el estado');
        }
    })
    .catch(error => console.error('Error al cambiar el estado:', error));
}

// Llamar a la función para cargar los servicios cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarServicios);
