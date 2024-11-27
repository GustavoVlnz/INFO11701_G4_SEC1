document.addEventListener('DOMContentLoaded', function () {

// Gráfico de Comparación de Servicios
fetch('infopedidos.php')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('graficoServicios').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Servicios Solicitados', 'Servicios Completados'],
                datasets: [{
                    label: 'Cantidad',
                    data: [data.Solicitados, data.Completados],
                    backgroundColor: ['#4caf50', '#2196f3'],
                    borderColor: ['#388e3c', '#1976d2'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Cantidad: ${context.raw}`
                        }
                    }
                },
                scales: {
                    x: {
                        barPercentage: 1, // Ajusta el grosor de las barras (entre 0 y 1)
                        categoryPercentage: 0.5, // Ajusta el espacio total ocupado por las barras en una categoría
                        ticks: {
                            font: {
                                size: 20 // Tamaño del texto en las etiquetas
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // Escala de incrementos
                        }
                    }
                }
            }
        });
    });



// Gráfico Circular de Géneros
fetch('generousuario.php')
    .then(response => response.json())
    .then(data => {
        const ctx2 = document.getElementById('graficoGenero').getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'],
                datasets: [{
                    label: 'Distribución por Género',
                    data: [data.Masculino, data.Femenino, data.Otro, data.PrefieroNoDecirlo],
                    backgroundColor: ['#00d9ff', '#ffca28', '#ff5722', '#9c27b0'],
                    borderColor: ['#fff', '#fff', '#fff', '#fff'],
                    borderWidth: 2
                }]
            }
        });
    });

// Gráfico Circular de Roles
fetch('cantidadRol.php')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('graficoRoles').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Empresa', 'Cliente'],
                datasets: [{
                    label: 'Usuarios por Rol',
                    data: [data.empresa, data.cliente],
                    backgroundColor: ['#ff6384', '#36a2eb'],
                    borderColor: ['#fff', '#fff'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top' // Cambia a 'left', 'right', o 'bottom' si es necesario
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw}`
                        }
                    }
                }
            }
        });
    });
})