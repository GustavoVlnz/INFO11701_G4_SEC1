// Función para obtener datos desde el servidor mediante PHP
async function fetchCompletedServicesData() {
    const response = await fetch('Estadisticas.php'); // Ruta correcta al archivo PHP que maneja los servicios completados
    const data = await response.json();
    return data;
}

// Gráfico de Servicios Completados por Mes
fetchCompletedServicesData().then(data => {
    const ctx = document.getElementById('completedServicesChart').getContext('2d');
    
    const maxServices = Math.max(...data.servicios);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.meses, // Nombres de los meses
            datasets: [{
                label: 'Servicios Completados',
                data: data.servicios,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: maxServices + 10 // Añade un margen al valor máximo
                }
            }
        }
    });
}).catch(error => {
    console.error('Error al obtener los datos:', error);
});

async function fetchAverageRatingData() {
    try {
        const response = await fetch('Calificacion.php');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        const text = await response.text();
        if (text) {
            try {
                const data = JSON.parse(text);
                return data;
            } catch (e) {
                throw new Error('Error al parsear JSON: ' + e.message + ', Respuesta: ' + text);
            }
        } else {
            throw new Error('Respuesta vacía del servidor');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}
// Gráfico de Calificación Promedio
fetchAverageRatingData().then(data => {
    const ctx2 = document.getElementById('averageRatingChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['5 estrellas', '4 estrellas', '3 estrellas', '2 estrellas', '1 estrella'],
            datasets: [{
                label: 'Calificación Promedio',
                data: [data.estrellas5, data.estrellas4, data.estrellas3, data.estrellas2, data.estrellas1],
                backgroundColor: [
                    'rgba(0, 128, 0, 0.6)', 
                    'rgba(144, 238, 144, 0.6)', 
                    'rgba(255, 255, 0, 0.6)', 
                    'rgba(255, 165, 0, 0.6)', 
                    'rgba(255, 69, 0, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 128, 0, 1)', 
                    'rgba(144, 238, 144, 1)', 
                    'rgba(255, 255, 0, 1)', 
                    'rgba(255, 165, 0, 1)', 
                    'rgba(255, 69, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false 
                }
            }
        },
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

// Función para obtener las ganancias desde el servidor
async function fetchGananciasData() {
    try {
        const response = await fetch('Ganancias.php');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        const text = await response.text();
        if (text) {
            try {
                const data = JSON.parse(text);
                return data;
            } catch (e) {
                throw new Error('Error al parsear JSON: ' + e.message + ', Respuesta: ' + text);
            }
        } else {
            throw new Error('Respuesta vacía del servidor');
        }
    } catch (error) {
        console.error('Error al obtener las ganancias:', error);
    }
}

// Gráfico de Ganancias por Servicio
fetchGananciasData().then(data => {
    const ctx = document.getElementById('earningsChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.servicios, 
            datasets: [{
                label: 'Ganancias por Servicio (CLP)',
                data: data.ganancias, 
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...data.ganancias) + 10000 
                }
            }
        }
    });
});

// Función para obtener los datos desde PHP
async function obtenerDatos() {
    try {
        const response = await fetch('Resumen.php'); // Ruta correcta al archivo PHP que maneja el resumen
        const data = await response.json();
        insertarDatosEnHTML(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para insertar los datos en el HTML
function insertarDatosEnHTML(data) {
    document.getElementById('total_servicios').innerText = data.total_servicios;
    document.getElementById('promedio_calificacion').innerText = data.promedio_calificacion;

    const listaServicios = document.getElementById('servicios_mas_solicitados');
    listaServicios.innerHTML = '';
    data.servicios_mas_solicitados.forEach(servicio => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${servicio.servicio}:</strong> ${servicio.cantidad} servicios completados`;
        listaServicios.appendChild(li);
    });
}

// Llamar a la función cuando la página haya cargado
window.onload = obtenerDatos;
