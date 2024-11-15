// Gráfico circular de pedidos
const pedidosChartCtx = document.getElementById('pedidosChart').getContext('2d');
const pedidosChart = new Chart(pedidosChartCtx, {
    type: 'doughnut',
    data: {
        labels: ['Completados', 'En Proceso', 'No Realizados'],
        datasets: [{
            data: [55, 30, 15], // Reemplazar con datos desde la base de datos
            backgroundColor: ['#00d9ff', '#ffc107', '#dc3545'],
            hoverBackgroundColor: ['#00a7cc', '#e0a800', '#c82333']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Gráfico de líneas para usuarios activos
const usuariosActivosCtx = document.getElementById('usuariosActivosChart').getContext('2d');
const usuariosActivosChart = new Chart(usuariosActivosCtx, {
    type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], // Datos por día
        datasets: [{
            label: 'Semana Actual',
            data: [120, 150, 180, 170, 160, 190, 220], // Datos desde la base de datos
            borderColor: '#00d9ff',
            fill: false
        }, {
            label: 'Semana Anterior',
            data: [110, 140, 160, 150, 140, 170, 200],
            borderColor: '#ff9800',
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Gráfico de líneas para servicios activos
const serviciosChartCtx = document.getElementById('serviciosChart').getContext('2d');
const serviciosChart = new Chart(serviciosChartCtx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
            label: 'Servicios Activos',
            data: [50, 60, 70, 90, 100, 130, 150], // Datos de la base de datos
            borderColor: '#00d9ff',
            fill: true,
            backgroundColor: 'rgba(0, 217, 255, 0.2)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
