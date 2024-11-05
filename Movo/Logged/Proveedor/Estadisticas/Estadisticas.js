// Función para obtener datos desde el servidor mediante PHP
async function fetchCompletedServicesData() {
    const response = await fetch('Estadisticas.php'); // Cambia 'ruta_php_completados_movo.php' por la ruta de tu archivo PHP
    const data = await response.json();
    return data;
}

// Gráfico de Servicios Completados por Mes
fetchCompletedServicesData().then(data => {
    const ctx = document.getElementById('completedServicesChart').getContext('2d');
    
    // Calcular el valor máximo para establecer el límite del gráfico
    const maxServices = Math.max(...data.servicios);
    
    // Crear el gráfico
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.meses, // Nombres de los meses devueltos desde PHP
            datasets: [{
                label: 'Servicios Completados',
                data: data.servicios, // Cantidad de servicios completados por mes
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: maxServices + 10 // Añadir un margen al valor máximo
                }
            }
        }
    });
}).catch(error => {
    console.error('Error al obtener los datos:', error);
});

 // Función para obtener las calificaciones promedio desde el servidor mediante PHP
async function fetchAverageRatingData() {
    const response = await fetch('Calificacion.php'); // Cambia 'ruta_php_calificaciones.php' por la ruta de tu archivo PHP
    const data = await response.json();
    return data;
}

// Gráfico de Calificación Promedio
fetchAverageRatingData().then(data => {
    const ctx2 = document.getElementById('averageRatingChart').getContext('2d');
    const averageRatingChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['5 estrellas', '4 estrellas', '3 estrellas', '2 estrellas', '1 estrella'],
            datasets: [{
                label: 'Calificación Promedio',
                data: [data.estrellas5, data.estrellas4, data.estrellas3, data.estrellas2, data.estrellas1], // Datos obtenidos del PHP
                backgroundColor: [
                    'rgba(0, 128, 0, 0.6)',    // Verde claro para 5 estrellas (mejor calificación)
                    'rgba(144, 238, 144, 0.6)', // Verde muy claro para 4 estrellas
                    'rgba(255, 255, 0, 0.6)',   // Amarillo claro para 3 estrellas
                    'rgba(255, 165, 0, 0.6)',   // Naranja claro para 2 estrellas
                    'rgba(255, 69, 0, 0.6)'     // Rojo claro para 1 estrella (peor calificación)
                ],
                borderColor: [
                    'rgba(0, 128, 0, 1)',    // Verde sólido para 5 estrellas
                    'rgba(144, 238, 144, 1)', // Verde claro sólido para 4 estrellas
                    'rgba(255, 255, 0, 1)',   // Amarillo sólido para 3 estrellas
                    'rgba(255, 165, 0, 1)',   // Naranja sólido para 2 estrellas
                    'rgba(255, 69, 0, 1)'     // Rojo sólido para 1 estrella
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Ocultamos las leyendas predeterminadas
                }
            }
        },
        // Plugin personalizado para generar las leyendas manualmente
        plugins: [{
            id: 'legendCallback',
            beforeInit: function(chart) {
                const legendContainer = document.getElementById('legend');
                let legendHTML = '<ul>';

                chart.data.labels.forEach((label, index) => {
                    const bgColor = chart.data.datasets[0].backgroundColor[index];
                    legendHTML += `<li>
                                    <span style="background-color:${bgColor}; border: 2px solid black;"></span> 
                                    ${label}
                                   </li>`;
                });

                legendHTML += '</ul>';
                legendContainer.innerHTML = legendHTML;
            }
        }]
    });
}).catch(error => {
    console.error('Error al obtener los datos:', error);
});
// Función para obtener las ganancias desde el servidor mediante PHP
async function fetchGananciasData() {
    try {
        const response = await fetch('Ganancias.php'); // Cambia 'Ganancias.php' por la ruta correcta a tu archivo PHP
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las ganancias:', error);
    }
}

// Gráfico de Ganancias por Servicio
fetchGananciasData().then(data => {
    const ctx = document.getElementById('earningsChart').getContext('2d');

    // Crear el gráfico
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.servicios, // Nombres de los servicios devueltos desde PHP
            datasets: [{
                label: 'Ganancias por Servicio (CLP)',
                data: data.ganancias, // Ganancias de cada servicio
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...data.ganancias) + 10000 // Añade un margen al valor máximo
                }
            }
        }
    });
});

// Función para obtener los datos desde PHP usando fetch
async function obtenerDatos() {
    try {
        const response = await fetch('Resumen.php'); // Asegúrate de que la ruta a tu archivo PHP es correcta
        const data = await response.json();
        
        // Llamar a la función que inserta los datos en el HTML
        insertarDatosEnHTML(data);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para insertar los datos en el HTML
function insertarDatosEnHTML(data) {
    // Insertar los datos en el HTML
    document.getElementById('total_servicios').innerText = data.total_servicios;
    document.getElementById('promedio_calificacion').innerText = data.promedio_calificacion;

    // Insertar los servicios más solicitados en la lista
    const listaServicios = document.getElementById('servicios_mas_solicitados');
    listaServicios.innerHTML = ''; // Limpiar lista existente
    data.servicios_mas_solicitados.forEach(servicio => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${servicio.servicio}:</strong> ${servicio.cantidad} servicios completados`;
        listaServicios.appendChild(li);
    });
}

// Llamar a la función cuando la página haya cargado
window.onload = obtenerDatos;