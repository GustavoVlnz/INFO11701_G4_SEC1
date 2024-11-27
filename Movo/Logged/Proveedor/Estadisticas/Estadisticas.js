// Cargar datos del backend
fetch('Estadisticas.php')
    .then(response => response.json())
    .then(data => {
        // Gráfico de Ganancias (Línea de Tiempo)
        const gananciasCtx = document.getElementById('chartGanancias').getContext('2d');
        new Chart(gananciasCtx, {
            type: 'line',
            data: {
                labels: Object.keys(data.ganancias).map(mes => `Mes ${mes}`),
                datasets: [{
                    label: 'Ganancias',
                    data: Object.values(data.ganancias),
                    borderColor: '#007bff',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
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

        // Gráfico de Pedidos (Línea de Tiempo)
        const pedidosCtx = document.getElementById('chartPedidos').getContext('2d');
        new Chart(pedidosCtx, {
            type: 'line',
            data: {
                labels: Object.keys(data.pedidos).map(mes => `Mes ${mes}`),
                datasets: [{
                    label: 'Pedidos',
                    data: Object.values(data.pedidos),
                    borderColor: '#28a745',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
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

        // Animar calificación promedio
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
    })
    .catch(error => console.error('Error al cargar los datos:', error));
