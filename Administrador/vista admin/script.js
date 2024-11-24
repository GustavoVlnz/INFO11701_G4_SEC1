document.addEventListener('DOMContentLoaded', function () {
    const usuariosElement = document.getElementById('total-usuarios');
    const serviciosActivosElement = document.getElementById('servicios-activos');
    const serviciosPendientesElement = document.getElementById('pedidos-pendientes');

    fetch('admin.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(data => {
            // Actualiza estadísticas principales
            usuariosElement.textContent = data.usuariosRegistrados;
            serviciosActivosElement.textContent = data.serviciosActivos;
            serviciosPendientesElement.textContent = data.pedidosPendientes;

            // Actualiza Últimos Pedidos
            const pedidosTable = document.querySelector('#datos tbody');
            pedidosTable.innerHTML = ''; // Limpia el contenido actual
            data.ultimosPedidos.forEach(pedido => {
                pedidosTable.innerHTML += `
                    <tr>
                        <td>${pedido.id_servicio}</td>
                        <td>${pedido.cliente}</td>
                        <td>${pedido.servicio_solicitado}</td>
                        <td>${pedido.estado}</td>
                        <td>${pedido.fecha_solicitud}</td>
                    </tr>`;
            });

            // Actualiza Solicitudes de Servicios
            const solicitudesContainer = document.getElementById('servicios-pymes');
            solicitudesContainer.innerHTML = '<h2 class="text-center">Solicitud de Servicios</h2>';
            data.solicitudesServicios.forEach((servicio, index) => {
                solicitudesContainer.innerHTML += `
                    <div class="servicio mb-4 bg-white p-4 rounded shadow-sm">
                        <h3>Empresa: <span>${servicio.proveedor}</span></h3>
                        <p>Servicio: <span>${servicio.servicio}</span></p>
                        <p>Descripción: ${servicio.reseñas}</p>
                        <p>Precio: ${servicio.ganancia}</p>
                    </div>`;
            });

            // Actualiza Reportes de Usuarios
            const reportesContainer = document.getElementById('reportes-usuarios');
            reportesContainer.innerHTML = '<h2 class="text-center">Reportes de Usuarios</h2>';
            data.reportesUsuarios.forEach(reporte => {
                reportesContainer.innerHTML += `
                    <div class="reporte mb-4 bg-white p-4 rounded shadow-sm">
                        <h3>Usuario: <span>${reporte.usuario}</span></h3>
                        <p>Servicio reportado: <span>${reporte.servicio}</span></p>
                        <p>Descripción: <span>${reporte.descripcion}</span></p>
                        <p>Estado del reporte: <span>${reporte.estado}</span></p>
                    </div>`;
            });

            // Actualiza Avisos de Ineficiencia
            const ineficienciaContainer = document.getElementById('ineficiencia');
            ineficienciaContainer.innerHTML = '<h2 class="text-center">Avisos de Ineficiencia</h2>';
            data.ineficiencia.forEach((aviso, index) => {
                let alertClass = 'alert-warning'; // Por defecto, regular
                let buttonClass = 'btn-warning'; // Botón regular

                if (aviso.tipo === 'bajo') {
                    alertClass = 'alert-danger'; // Aviso de bajo rendimiento
                    buttonClass = 'btn-danger'; // Botón de bajo rendimiento
                }

                ineficienciaContainer.innerHTML += `
                    <div class="alert ${alertClass}">
                        <h5>Proveedor: <span>${aviso.proveedor}</span> - ${aviso.tipo === 'bajo' ? 'Bajo rendimiento' : 'Desempeño regular'}</h5>
                        <p>Descripción: ${aviso.descripcion}</p>
                        <button class="btn ${buttonClass}">Revisar Detalles</button>
                    </div>`;
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
