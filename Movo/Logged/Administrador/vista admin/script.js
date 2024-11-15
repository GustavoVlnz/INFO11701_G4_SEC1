
function mostrarDetalles(id) {
    const detalles = document.getElementById(`detalles-${id}`);
    if (detalles.style.display === "none" || detalles.style.display === "") {
        detalles.style.display = "block";
    } else {
        detalles.style.display = "none";
    }
}

function verEstado(id) {
    const estadoReporte = document.getElementById(`estado-${id}`);
    if (estadoReporte.style.display === "none" || estadoReporte.style.display === "") {
        estadoReporte.style.display = "block";
    } else {
        estadoReporte.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Selección por id
    const usuariosElement = document.getElementById('total-usuarios');
    const serviciosActivosElement = document.getElementById('servicios-activos');
    const serviciosPendientesElement = document.getElementById('pedidos-pendientes');

    fetch('admin.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.text(); // Cambiar a .text() para inspeccionar la respuesta
        })
        .then(text => {
            console.log('Respuesta recibida del servidor:', text); // Imprimir la respuesta completa para inspección

            try {
                const data = JSON.parse(text); // Intentar convertir la respuesta a JSON
                console.log('Datos parseados:', data);

                // Actualiza los elementos del HTML con los datos recibidos
                usuariosElement.textContent = data.usuariosRegistrados;
                serviciosActivosElement.textContent = data.serviciosActivos;
                serviciosPendientesElement.textContent = data.serviciosPendientes;
            } catch (error) {
                console.error('Error al intentar parsear JSON:', error);
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
});

