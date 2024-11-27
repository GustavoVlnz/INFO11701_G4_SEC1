// Generar un arreglo con todos los meses del año
const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Cargar datos del backend
fetch('Estadisticas.php')
    .then(response => response.json())
    .then(data => {
        // Preprocesar datos para asegurar que todos los meses tengan un valor
        const gananciasMensuales = meses.map((_, i) => data.ganancias[i + 1] || 0);
        const pedidosMensuales = meses.map((_, i) => data.pedidos[i + 1] || 0);

        // Gráfico de Ganancias Mensuales
        const gananciasCtx = document.getElementById('chartGanancias').getContext('2d');
        new Chart(gananciasCtx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Ganancias ($)',
                    data: gananciasMensuales,
                    backgroundColor: '#007bff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Ganancias ($)'
                        }
                    }
                }
            }
        });

        // Gráfico de Pedidos Mensuales
        const pedidosCtx = document.getElementById('chartPedidos').getContext('2d');
        new Chart(pedidosCtx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Pedidos',
                    data: pedidosMensuales,
                    backgroundColor: '#28a745',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cantidad de Pedidos'
                        }
                    }
                }
            }
        });

        // Calificación Promedio con animación
        const calificacionPromedio = data.calificacion;
        const circle = document.querySelector('#circleCalificacion circle:nth-child(2)');
        const calificacionText = document.getElementById('calificacionText');
        const circumference = 440; // Circunferencia del círculo

        gsap.to(circle, {
            strokeDashoffset: circumference - (calificacionPromedio / 5) * circumference,
            duration: 1.5,
            ease: "power2.out"
        });

        gsap.to({}, {
            duration: 1.5,
            onUpdate: function () {
                const currentValue = this.progress() * calificacionPromedio;
                calificacionText.textContent = currentValue.toFixed(1);
            }
        });

        // Animaciones para cada sección
        gsap.from("#sectionGanancias", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });
        gsap.from("#sectionPedidos", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5
        });
        gsap.from("#sectionCalificacion", {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: 0.8
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
s