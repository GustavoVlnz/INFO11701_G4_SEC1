<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
    const servicios = [
        { id: "A5Z3Q", nombre: "Chef a Domicilio", descripcion: "Un chef profesional cocinando en tu hogar.", precio: "$150.000 CLP" },
        { id: "K9P7R", nombre: "Limpieza del Hogar", descripcion: "Servicio de limpieza profunda.", precio: "$75.000 CLP" },
        { id: "J8F4B", nombre: "Jardinería", descripcion: "Cuidado y mantenimiento de jardines.", precio: "$100.000 CLP" },
        { id: "D3L1T", nombre: "Constructor", descripcion: "Servicios de construcción y reformas.", precio: "$200.000 CLP" },
        { id: "Z7X8H", nombre: "Plomería", descripcion: "Reparaciones y mantenimiento de tuberías.", precio: "$90.000 CLP" },
        { id: "G2R6Y", nombre: "Electricista", descripcion: "Instalaciones y reparaciones eléctricas.", precio: "$110.000 CLP" },
        { id: "M1N9V", nombre: "Pintura", descripcion: "Pintura de interiores y exteriores.", precio: "$130.000 CLP" },
        { id: "X4U7P", nombre: "Mudanza", descripcion: "Servicios completos de mudanza.", precio: "$180.000 CLP" },
        { id: "C8S5J", nombre: "Mantenimiento de Computadoras", descripcion: "Reparación y mantenimiento de PCs.", precio: "$95.000 CLP" },
        { id: "R9V6E", nombre: "Mecánico", descripcion: "Mantenimiento y reparación de automóviles.", precio: "$160.000 CLP" },
        { id: "H7P4K", nombre: "Seguridad Privada", descripcion: "Vigilancia y seguridad personalizada.", precio: "$250.000 CLP" },
        { id: "F3D9L", nombre: "Organización de Eventos", descripcion: "Planificación y ejecución de eventos.", precio: "$300.000 CLP" },
        { id: "B2Q6Z", nombre: "Fotografía", descripcion: "Servicio profesional de fotografía.", precio: "$120.000 CLP" },
        { id: "E5W3T", nombre: "Clases Particulares", descripcion: "Clases a domicilio en diversas materias.", precio: "$50.000 CLP" },
        { id: "U9L1C", nombre: "Entrenador Personal", descripcion: "Entrenamiento físico a domicilio.", precio: "$140.000 CLP" },
        { id: "A1B2C", nombre: "Masajes a Domicilio", descripcion: "Relajación y bienestar en la comodidad de tu hogar.", precio: "$30.000 CLP" },
        { id: "A2B3C", nombre: "Nutricionista", descripcion: "Asesoría nutricional personalizada.", precio: "$50.000 CLP" },
        { id: "A3B4C", nombre: "Clases de Yoga", descripcion: "Sesiones de yoga adaptadas a tus necesidades.", precio: "$20.000 CLP" },
        { id: "A4B5C", nombre: "Entrenamiento de Mascotas", descripcion: "Clases de adiestramiento para tus mascotas.", precio: "$40.000 CLP" },
        { id: "A5B6C", nombre: "Decoración de Interiores", descripcion: "Asesoría en diseño y decoración de espacios.", precio: "$100.000 CLP" },
        { id: "A6B7C", nombre: "Reparaciones Eléctricas", descripcion: "Soluciones rápidas y eficientes en electricidad.", precio: "$80.000 CLP" },
        { id: "A7B8C", nombre: "Transporte de Mascotas", descripcion: "Traslados seguros para tus mascotas.", precio: "$25.000 CLP" },
        { id: "A8B9C", nombre: "Lavado de Autos", descripcion: "Lavado y limpieza a fondo de tu vehículo.", precio: "$15.000 CLP" },
        { id: "A9B0C", nombre: "Planificación de Eventos", descripcion: "Organización integral de eventos especiales.", precio: "$150.000 CLP" },
        { id: "A0B1C", nombre: "Cuidador de Mascotas", descripcion: "Cuidado y paseos para tus mascotas en la comodidad de tu hogar.", precio: "$40.000 CLP" }

    ];
    // Función para agregar filas a la tabla de servicios
    function agregarServicioATabla() {
        const tabla = document.getElementById('serviceTable');
        servicios.forEach(servicio => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${servicio.id}</td>
                <td>${servicio.nombre}</td>
                <td>${servicio.descripcion}</td>
                <td>${servicio.precio}</td>
                <td>
                    <button class="btn btn-warning btn-sm editar-btn" data-id="${servicio.id}">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar-btn" data-id="${servicio.id}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    // Cargar la tabla al iniciar la página
    agregarServicioATabla();

    // Manejar los clics en los botones de editar y eliminar
    document.getElementById('serviceTable').addEventListener('click', function (e) {
        if (e.target.classList.contains('editar-btn')) {
            const idServicio = e.target.getAttribute('data-id');
            alert(`Editar servicio con ID: ${idServicio}`);
            // Aquí puedes implementar la lógica para editar el servicio
        }

        if (e.target.classList.contains('eliminar-btn')) {
            const idServicio = e.target.getAttribute('data-id');
            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el servicio con ID: ${idServicio}?`);
            if (confirmacion) {
                // Eliminar el servicio de la tabla (solo para demostración, no elimina del array)
                const fila = e.target.closest('tr');
                fila.remove();
                alert(`Servicio con ID: ${idServicio} eliminado.`);
            }
        }
    });
});
=======
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
>>>>>>> Alex
