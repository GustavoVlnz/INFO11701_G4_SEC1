document.addEventListener('DOMContentLoaded', function () {
    cargarServicios();
    const formAgregar = document.getElementById('form-agregar');
    if (formAgregar) {
        formAgregar.addEventListener('submit', async function (e) {
            e.preventDefault();

            try {
                // Capturar y limpiar los datos del formulario
                const nombreServicio = limpiarDato(document.getElementById('nombre-servicio').value);
                const descripcionCorta = limpiarDato(document.getElementById('descripcion-corta').value);
                const descripcionLarga = limpiarDato(document.getElementById('descripcion-larga').value);
                const categoriaId = parseInt(document.getElementById('categoria').value);
                const precio = parseFloat(document.getElementById('precio').value);

                // Validar los datos antes de enviarlos
                if (!nombreServicio || !descripcionCorta || !descripcionLarga || isNaN(categoriaId) || isNaN(precio) || precio < 0) {
                    alert('Por favor, rellene todos los campos correctamente.');
                    return;
                }

                // Crear un objeto de datos para enviar
                const datosServicio = {
                    nombre_servicio: nombreServicio,
                    descripcion_corta: descripcionCorta,
                    descripcion_larga: descripcionLarga,
                    id_categoria: categoriaId,
                    precio_servicio: precio
                };

                // Verificar el JSON que se enviará (útil para depuración)
                console.log('Datos a enviar:', datosServicio);

                // Enviar datos al servidor mediante fetch
                const response = await fetch('Gestion_phps/agregar.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosServicio)
                });

                // Verificar que la respuesta sea válida
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                }

                // Procesar la respuesta del servidor
                const data = await response.json();
                if (data.success) {
                    alert('Servicio agregado exitosamente.');
                } else {
                    alert('Error al agregar el servicio: ' + data.error);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Hubo un problema al intentar enviar los datos. Verifique la consola para más detalles.');
            }
        });
    }
    // Función para limpiar datos
    function limpiarDato(dato) {
        return dato.trim().replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar espacios y etiquetas HTML
    }
});

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
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar los servicios: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const listaServicios = document.getElementById('lista-servicios');
            listaServicios.innerHTML = ''; // Limpiar la lista anterior
            data.forEach(servicio => {
                const div = document.createElement('div');
                div.classList.add('card', 'mb-4', 'shadow', 'p-3', 'rounded');

                // Obtener la descripción de la categoría
                const descripcionCategoria = categorias[servicio.id_categoria] || 'Categoría Desconocida';

                div.innerHTML = `
                    <input type="hidden" value="${servicio.id_servicio}" class="id-servicio">
                    <div class="card-body">
                        <h5 class="card-title"><strong>Nombre:</strong> ${servicio.nombre_servicio}</h5>
                        <p class="card-text"><strong>Descripción Corta:</strong> ${servicio.descripcion_corta}</p>
                        <p class="card-text"><strong>Descripción Larga:</strong> ${servicio.descripcion_larga}</p>
                        <p class="card-text"><strong>Precio:</strong> ${servicio.precio_servicio} CLP</p>
                        <p class="card-text"><strong>Estado:</strong> ${servicio.estado_servicio}</p>
                        <p class="card-text"><strong>Categoría:</strong> ${descripcionCategoria}</p>
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

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('eliminar')) {
        const card = e.target.closest('.card');
        const idServicio = card.querySelector('.id-servicio').value;

        if (confirm('¿Seguro que deseas eliminar este servicio?')) {
            fetch('Gestion_phps/eliminar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idServicio })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.statusText}`);
                }
                return response.json();
            })
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
        const card = e.target.closest('.card');

        const idServicio = card.querySelector('.id-servicio').value;
        const nombreActual = card.querySelector('.card-title').innerText.replace('Nombre: ', '').trim();
        const descripcionCortaActual = card.querySelector('.card-text:nth-of-type(1)').innerText.replace('Descripción Corta: ', '').trim();
        const descripcionLargaActual = card.querySelector('.card-text:nth-of-type(2)').innerText.replace('Descripción Larga: ', '').trim();
        const precioActual = parseFloat(card.querySelector('.card-text:nth-of-type(3)').innerText.replace('Precio: ', '').replace(' CLP', '').trim());
        const categoriaActual = card.querySelector('.card-text:nth-of-type(5)').innerText.replace('Categoría: ', '').trim();

        const nuevoNombre = prompt('Editar nombre del servicio:', nombreActual);
        const nuevaDescripcionCorta = prompt('Editar descripción corta del servicio:', descripcionCortaActual);
        const nuevaDescripcionLarga = prompt('Editar descripción larga del servicio:', descripcionLargaActual);
        const nuevoPrecio = prompt('Editar precio del servicio (CLP):', precioActual);
        const nuevaCategoria = prompt('Editar categoría (1-8):', categoriaActual);

        if (nuevoNombre && nuevaDescripcionCorta && nuevaDescripcionLarga && nuevoPrecio && nuevaCategoria) {
            fetch('Gestion_phps/editar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: idServicio,
                    nombre_servicio: nuevoNombre,
                    descripcion_corta: nuevaDescripcionCorta,
                    descripcion_larga: nuevaDescripcionLarga,
                    precio_servicio: parseFloat(nuevoPrecio),
                    id_categoria: parseInt(nuevaCategoria)
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.statusText}`);
                }
                return response.json();
            })
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
