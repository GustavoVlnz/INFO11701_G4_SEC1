document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener y mostrar los servicios
    function cargarServicios() {
        fetch('servicios.php') // Llamada al archivo PHP
            .then(response => response.json()) // Convertir la respuesta a JSON
            .then(data => {
                const serviceTable = document.getElementById('serviceTable');
                serviceTable.innerHTML = ''; // Limpiar la tabla antes de agregar datos

                // Iterar sobre los servicios y agregarlos a la tabla
                data.forEach(servicio => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${servicio.id_servicio}</td>
                        <td>${servicio.nombre_servicio}</td>
                        <td>${servicio.descripcion}</td>
                        <td>$${servicio.precio_servicio}</td>
                        <td>
                            <button class="btn btn-aceptar">Aceptar</button>
                            <button class="btn btn-editar">Editar</button>
                            <button class="btn btn-eliminar">Eliminar</button>
                        </td>
                    `;

                    serviceTable.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar los servicios:', error));
    }

    // Llamar a la función para cargar los servicios al cargar la página
    cargarServicios();
});
