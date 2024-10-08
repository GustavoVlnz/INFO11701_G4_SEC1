
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

// Selecciona el canvas donde irá el primer gráfico
const ctx = document.getElementById('miGrafico').getContext('2d');

// Crea el primer gráfico de barras
const miGrafico = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'], // Etiquetas del eje X
        datasets: [{
            label: 'Pedidos del año - Mensual',
            data: [181, 198, 294, 240, 194, 230, 130, 190, 132], // Datos de ejemplo
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 105, 180, 0.2)',
                'rgba(0, 128, 0, 0.2)',
                'rgba(255, 215, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 105, 180, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(255, 215, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    padding: 10
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 10
                }
            }
        }
    }
});

// Función para generar datos aleatorios que sumen 132
function generarDatosAleatorios(total) {
    const datos = [];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
        const max = total - suma - (9 - i - 1); // Asegurar que la suma no exceda el total
        const valor = Math.floor(Math.random() * max) + 1; // Genera un número entre 1 y el máximo permitido
        datos.push(valor);
        suma += valor;
    }
    return datos;
}

// Datos aleatorios para septiembre
const datosSeptiembre = generarDatosAleatorios(132);

// Selecciona el canvas donde irá el segundo gráfico
const ctxSeptiembre = document.getElementById('graficoSeptiembre').getContext('2d');

// Crea el segundo gráfico de barras
const graficoSeptiembre = new Chart(ctxSeptiembre, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['1-8', '9-16', '17-24', '25-30'], // Etiquetas del eje X
        datasets: [{
            label: 'Pedidos de Septiembre',
            data: [24, 68, 34, 24], // Datos de ejemplo
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    padding: 10
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 10
                }
            }
        }
    }
});
