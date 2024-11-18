document.addEventListener('DOMContentLoaded', function () {
    // Gráfico de Pedidos (ya implementado)
    fetch('pedidos.php')
        .then(response => response.json())
        .then(data => {
            const ctx1 = document.getElementById('graficoPedidos').getContext('2d');
            new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: ['Completados', 'En Proceso', 'No Realizados'],
                    datasets: [{
                        label: 'Pedidos',
                        data: [data.completados, data.en_proceso, data.no_realizados],
                        backgroundColor: ['#00d9ff', '#ffca28', '#ff5722'],
                        borderColor: ['#fff', '#fff', '#fff'],
                        borderWidth: 2
                    }]
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
                    labels: ['Masculino', 'Femenino', 'Otro'],
                    datasets: [{
                        label: 'Distribución por Género',
                        data: [data.masculino, data.femenino, data.otro],
                        backgroundColor: ['#00d9ff', '#ffca28', '#ff5722'],
                        borderColor: ['#fff', '#fff', '#fff'],
                        borderWidth: 2
                    }]
                }
            });
        });

    // Gráfico de Servicios Activos (ya implementado)
    fetch('servicios_activos.php')
        .then(response => response.json())
        .then(data => {
            const fechas = data.map(item => item.fecha);
            const serviciosActivos = data.map(item => item.servicios_activos);
            const ctx3 = document.getElementById('graficoServicios').getContext('2d');
            new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Servicios Activos',
                        data: serviciosActivos,
                        backgroundColor: '#ffca28',
                        borderColor: '#ffca28',
                        fill: false,
                        tension: 0.1
                    }]
                }
            });
        });
});
