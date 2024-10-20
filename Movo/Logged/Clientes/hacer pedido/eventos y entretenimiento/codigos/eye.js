// Función para cargar los servicios dinámicamente
function cargarServicios() {
    // Hacemos una petición a eye.php
    fetch('eye.php')
        .then(response => response.json())
        .then(servicios => {
            const contenedorServicios = document.getElementById('servicios-container');
            servicios.forEach(servicio => {
                // Creamos un div por cada servicio
                const divServicio = document.createElement('div');
                divServicio.classList.add('servicio');
                
                // Contenido HTML de cada servicio
                divServicio.innerHTML = `
                    <img src="../imagenes/${servicio.imagen}" alt="${servicio.nombre}">
                    <h3>${servicio.nombre}</h3>
                    <p>Precio: $${new Intl.NumberFormat().format(servicio.precio)} CLP</p>
                    <button onclick="agregarServicio('${servicio.nombre}', ${servicio.precio})">Agregar</button>
                `;

                // Agregar el servicio al contenedor
                contenedorServicios.appendChild(divServicio);
            });
        })
        .catch(error => console.error('Error al cargar los servicios:', error));
}

// Llamar a la función cargarServicios cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', cargarServicios);
