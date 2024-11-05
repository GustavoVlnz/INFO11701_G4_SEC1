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
                    } else if (servicio.estado === 'completado') {
                        document.querySelector('#tabla-completados tbody').appendChild(fila);
                    }
                });
            } else {
                console.error('Error al cargar los servicios:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

// Función para crear una fila de servicio y aplicar las clases CSS correctas
function crearFilaServicio(servicio) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>#${servicio.id}</td>
        <td>${servicio.cliente}</td>
        <td>${servicio.fecha}</td>
        <td>${servicio.descripcion}</td>
        <td><span class="status ${getStatusClass(servicio.estado)}">${capitalize(servicio.estado)}</span></td>
        <td>${crearAcciones(servicio.estado, servicio.id)}</td>
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
        case 'completado':
            return 'status-completed';
        default:
            return '';
    }
}

// Función para crear los botones de acción según el estado
function crearAcciones(estado, id) {
    if (estado === 'pendiente') {
        return `
            <button class="btn btn-success btn-sm" onclick="cambiarEstado(this, 'aceptado', ${id})">Aceptar</button>
            <button class="btn btn-danger btn-sm" onclick="cambiarEstado(this, 'rechazado', ${id})">Rechazar</button>
        `;
    } else if (estado === 'aceptado') {
        return `<button class="btn btn-primary btn-sm" onclick="cambiarEstado(this, 'completado', ${id})">Marcar como Completado</button>`;
    }
    return ''; // No hay acciones para rechazados o completados
}

// Función para capitalizar la primera letra de una palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Función para limpiar todas las tablas antes de cargar los servicios
function limpiarTablas() {
    document.querySelector('#tabla-pendientes').innerHTML = '';
    document.querySelector('#tabla-aceptados tbody').innerHTML = '';
    document.querySelector('#tabla-rechazados tbody').innerHTML = '';
    document.querySelector('#tabla-completados tbody').innerHTML = '';
}


function cambiarEstado(boton, nuevoEstado, idServicio) {
    // Enviar solicitud para cambiar el estado
    fetch('cambiar_estado.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idServicio, estado: nuevoEstado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const fila = boton.closest('tr');
            const estadoSpan = fila.querySelector('.status');
            
            // Actualizar el texto y la clase del estado usando la función getStatusClass para obtener la clase correcta
            estadoSpan.textContent = capitalize(nuevoEstado);
            estadoSpan.className = 'status ' + getStatusClass(nuevoEstado);

            // Mover la fila a la tabla correspondiente
            if (nuevoEstado === 'aceptado') {
                document.querySelector('#tabla-aceptados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = `<button class="btn btn-primary btn-sm" onclick="cambiarEstado(this, 'completado', ${idServicio})">Marcar como Completado</button>`;
            } else if (nuevoEstado === 'rechazado') {
                document.querySelector('#tabla-rechazados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = ''; // Elimina las acciones
            } else if (nuevoEstado === 'completado') {
                document.querySelector('#tabla-completados tbody').appendChild(fila);
                fila.querySelector('td:last-child').innerHTML = ''; // Elimina las acciones
            }
        } else {
            alert('Error al cambiar el estado');
        }
    });
}

// Función para capitalizar la primera letra de una palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Llamar a la función para cargar los servicios cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarServicios);

