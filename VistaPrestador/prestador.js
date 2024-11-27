// Datos para los últimos 6 meses
const statsData6Meses = {
    labels: ["Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"],
    datasets: [{
        label: 'Ingresos de los Últimos 6 Meses',
        data: [12000, 21000, 19000, 21000, 25000, 23000], // Ingresos simulados en CLP
        backgroundColor: [
            '#80D4FF', // Celeste brillante
            '#0066FF', // Azul muy intenso
            '#80D4FF', // Celeste brillante
            '#0066FF', // Azul muy intenso
            '#80D4FF', // Celeste brillante
            '#0066FF'  // Azul muy intenso
        ],
        borderColor: [
            '#0059B3', // Azul muy intenso (más oscuro)
            '#0059B3', // Azul muy intenso (más oscuro)
            '#0059B3', // Azul muy intenso (más oscuro)
            '#0059B3', // Azul muy intenso (más oscuro)
            '#0059B3', // Azul muy intenso (más oscuro)
            '#0059B3'  // Azul muy intenso (más oscuro)
        ],
        borderWidth: 2
    }]
};

// Configuración para el gráfico de los últimos 6 meses
const config6Meses = {
    type: 'bar',
    data: statsData6Meses,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Inicializar el gráfico de los últimos 6 meses
const ctx6Meses = document.getElementById('grafico6Meses').getContext('2d');
new Chart(ctx6Meses, config6Meses);


// Datos para todo el año
const statsDataTodoAno = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"],
    datasets: [{
        label: 'Ingresos de Todo el Año',
        data: [35000, 28000, 38000, 32000, 27000, 13000, 18000, 21000, 19000, 21000, 25000, 23000], // Ingresos simulados en CLP
        backgroundColor: [
            '#80D4FF', '#0066FF', '#80D4FF', '#0066FF', '#80D4FF', '#0066FF', '#80D4FF', '#0066FF',
            '#80D4FF', '#0066FF', '#80D4FF', '#0066FF'
        ],
        borderColor: [
            '#0059B3', '#0059B3', '#0059B3', '#0059B3', '#0059B3', '#0059B3', '#0059B3', '#0059B3',
            '#0059B3', '#0059B3', '#0059B3', '#0059B3'
        ],
        borderWidth: 2
    }]
};

// Configuración para el gráfico de todo el año
const configTodoAno = {
    type: 'bar',
    data: statsDataTodoAno,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Inicializar el gráfico de todo el año
const ctxTodoAno = document.getElementById('graficoTodoElAno').getContext('2d');
new Chart(ctxTodoAno, configTodoAno);
