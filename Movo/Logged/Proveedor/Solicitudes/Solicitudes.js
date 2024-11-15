// Función para capitalizar la primera letra de una palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/// Función que llama a Solicitudes.php y obtiene los datos de los servicios
function cargarServicios() {
    fetch('Solicitudes.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Limpiar las tablas
                limpiarTablas();

                // Recorrer los servicios y colocarlos en la tabla correspondiente
                data.data.forEach(servicio => {
                    const fila = crearFilaServicio(servicio);
                    if (servicio.estado === 'pendiente') {
                        document.querySelector('#tabla-pendientes').appendChild(fila);
                    } else if (servicio.estado === 'aceptado') {
                        document.querySelector('#tabla-aceptados tbody').appendChild(fila);
                    } else if (servicio.estado === 'rechazado') {
                        document.querySelector('#tabla-rechazados tbody').appendChild(fila);
                    } else if (servicio.estado === 'realizado') {
                        document.querySelector('#tabla-completados tbody').appendChild(fila);
                    }
                });
            } else {
                console.error('Error al cargar los servicios:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

/// Función para crear una fila de servicio y aplicar las clases CSS correctas
function crearFilaServicio(servicio) {
    const tr = document.createElement('tr');

    // Extraer solo la parte de la fecha (sin la hora)
    const soloFecha = servicio.fecha.split(' ')[0];  // Esto elimina la hora si está presente

    tr.innerHTML = `
        <td>#${servicio.idUsuario}</td> <!-- N° de Solicitud: idUsuario -->
        <td>${servicio.cliente}</td> <!-- Cliente -->
        <td>${soloFecha}</td> <!-- Fecha sin hora -->
        <td>${servicio.descripcion}</td> <!-- Descripción del servicio -->
        <td><span class="status ${getStatusClass(servicio.estado)}">${capitalize(servicio.estado)}</span></td>
        <td>${crearAcciones(servicio.estado, servicio.idUsuario)}</td> <!-- Acciones basadas en idUsuario -->
    `;

    return tr;
}

// Función para obtener la clase de estilo correspondiente al estado
function getStatusClass(estado) {
    switch(estado) {
        case 'pendiente':
            return 'status-pending';
        case 'aceptado':
            return 'status-accepted';
        case 'rechazado':
            return 'status-canceled';
        case 'realizado':
            return 'status-completed';
        default:
            return '';
    }
}

// Función para crear los botones de acción según el estado
function crearAcciones(estado, idUsuario) {  // Basado en idUsuario
    if (estado === 'pendiente') {
        return `
            <button class="btn btn-success btn-sm" onclick="cambiarEstado(this, 'aceptado', ${idUsuario})">Aceptar</button>
            <button class="btn btn-danger btn-sm" onclick="cambiarEstado(this, 'rechazado', ${idUsuario})">Rechazar</button>
        `;
    } else if (estado === 'aceptado') {
        return `<button class="btn btn-primary btn-sm" onclick="cambiarEstado(this, 'completado', ${idUsuario})">Marcar como Completado</button>`;
    }
    return ''; // No hay acciones para rechazados o completados
}

// Función para limpiar todas las tablas antes de cargar los servicios
function limpiarTablas() {
    document.querySelector('#tabla-pendientes').innerHTML = '';
    document.querySelector('#tabla-aceptados tbody').innerHTML = '';
    document.querySelector('#tabla-rechazados tbody').innerHTML = '';
    document.querySelector('#tabla-completados tbody').innerHTML = '';
}

// Función para cambiar el estado de un servicio
function cambiarEstado(boton, nuevoEstado, idUsuario) {
    fetch('cambiar_estado.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idUsuario, estado: nuevoEstado })  // Basado en idUsuario
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const fila = boton.closest('tr');
            const estadoSpan = fila.querySelector('.status');

            // Actualizar el texto y la clase del estado
            estadoSpan.textContent = capitalize(nuevoEstado);
            estadoSpan.className = 'status ' + getStatusClass(nuevoEstado);

            // Mover la fila a la tabla correspondiente
            if (nuevoEstado === 'aceptado') {
                document.querySelector('#tabla-aceptados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = `<button class="btn btn-primary btn-sm" onclick="cambiarEstado(this, 'completado', ${idUsuario})">Marcar como Completado</button>`;
            } else if (nuevoEstado === 'rechazado') {
                document.querySelector('#tabla-rechazados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = ''; // Elimina las acciones
            } else if (nuevoEstado === 'realizado') {
                document.querySelector('#tabla-completados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = ''; // Elimina las acciones
            }
        } else {
            alert('Error al cambiar el estado');
        }
    });
}

// Llamar a la función para cargar los servicios cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarServicios);
