document.addEventListener('DOMContentLoaded', function() {
    cargarServicios();

    const formAgregar = document.getElementById('form-agregar');
    formAgregar.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombreServicio = document.getElementById('nombre-servicio').value;
        const descripcion = document.getElementById('descripcion').value;
        const categoriaId = document.getElementById('categoria').value;
        agregarServicio(nombreServicio, descripcion, categoriaId);
    });
});

function cargarServicios() {
    const categorias = {
        1: 'Fontanería',
        2: 'Electricidad',
        3: 'Carpintería',
        4: 'Limpieza',
        5: 'Pintura',
        6: 'Jardinería',
        7: 'Reparaciones Generales',
        8: 'Cerrajería'
    };

    fetch('Gestion_phps/obtener.php')
        .then(response => response.json())
        .then(data => {
            const listaServicios = document.getElementById('lista-servicios');
            listaServicios.innerHTML = ''; // Limpiar la lista anterior
            data.forEach(servicio => {
                const div = document.createElement('div');
                div.classList.add('card', 'mb-4', 'shadow', 'p-3', 'rounded');

                // Añadir un campo oculto con el id del servicio
                div.innerHTML = `
                    <input type="hidden" value="${servicio.id_servicio}" class="id-servicio">
                    <div class="card-body">
                        <h5 class="card-title"><strong>Nombre:</strong> ${servicio.nombre_servicio}</h5>
                        <p class="card-text"><strong>Descripción:</strong> ${servicio.descripcion}</p>
                        <p class="card-text"><strong>Estado:</strong> 
                            <span class="badge ${getEstadoClass(servicio.estado)} estado-grande">${servicio.estado}</span>
                        </p>
                        <p class="card-text"><strong>Categoría:</strong> ${categorias[servicio.id_categoria]}</p>
                        <div>
                            <button class="btn btn-primary editar">Editar</button>
                            <button class="btn btn-danger eliminar">Eliminar</button>
                        </div>
                    </div>
                `;
                listaServicios.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al cargar los servicios:', error);
        });
}



// Función para obtener la clase de estado
function getEstadoClass(estado) {
    switch (estado) {
        case 'activo':
            return 'badge-success';
        case 'pendiente':
            return 'badge-warning';
        case 'realizado':
            return 'badge-info';
        default:
            return 'badge-light';
    }
}

function agregarServicio(nombre, descripcion, categoriaId) {
    fetch('Gestion_phps/agregar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_servicio: nombre, descripcion: descripcion, categoria_id: categoriaId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cargarServicios();
        } else {
            alert('Error al agregar el servicio');
        }
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('eliminar')) {
        // Encontrar la tarjeta más cercana (card) desde el botón que fue clicado
        const card = e.target.closest('.card');
        // Obtener el id del servicio desde el input hidden
        const idServicio = card.querySelector('.id-servicio').value;

        // Confirmar antes de eliminar
        if (confirm('¿Seguro que deseas eliminar este servicio?')) {
            fetch('Gestion_phps/eliminar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idServicio }) // Enviar el id del servicio al servidor
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    cargarServicios(); // Recargar la lista de servicios tras eliminar
                } else {
                    alert('Error al eliminar el servicio: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el servicio:', error);
            });
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('editar')) {
        // Encontrar la tarjeta (card) más cercana desde el botón de "Editar"
        const card = e.target.closest('.card');

        // Obtener los valores actuales desde los elementos del DOM
        const idServicio = card.querySelector('.id-servicio').value;
        const nombreActual = card.querySelector('.card-title').innerText.replace('Nombre: ', '');
        const descripcionActual = card.querySelector('.card-text').innerText.replace('Descripción: ', '');
        const categoriaActual = card.querySelector('.card-text + .card-text').innerText.replace('Categoría: ', '');

        // Pedimos al usuario que ingrese los nuevos valores
        const nuevoNombre = prompt('Editar nombre del servicio:', nombreActual);
        const nuevaDescripcion = prompt('Editar descripción del servicio:', descripcionActual);
        const nuevaCategoria = prompt('Editar categoría (1-8):', categoriaActual);

        // Si se ingresan los nuevos valores, hacemos la solicitud de edición
        if (nuevoNombre && nuevaDescripcion && nuevaCategoria) {
            fetch('Gestion_phps/editar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: idServicio, // El id del servicio que se va a editar
                    nombre_servicio: nuevoNombre, // Nuevo nombre del servicio
                    descripcion: nuevaDescripcion, // Nueva descripción del servicio
                    id_categoria: nuevaCategoria // Nueva categoría seleccionada (del 1 al 8)
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    cargarServicios(); // Recargar los servicios después de la edición
                } else {
                    alert('Error al editar el servicio: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error al editar el servicio:', error);
            });
        }
    }
});

