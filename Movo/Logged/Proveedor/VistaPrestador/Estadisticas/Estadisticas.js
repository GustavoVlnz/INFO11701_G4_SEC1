 // Gráfico de Barras: Servicios completados por mes
 const ctx = document.getElementById('completedServicesChart').getContext('2d');
 const completedServicesChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
         datasets: [{
             label: 'Servicios Completados',
             data: [3, 4, 5, 7, 6, 8, 10, 9, 7, 6, 8, 10], // Datos de ejemplo
             backgroundColor: 'rgba(54, 162, 235, 0.2)',
             borderColor: 'rgba(54, 162, 235, 1)',
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true
             }
         }
     }
 });

 // Gráfico Circular: Calificación Promedio
 const ctx2 = document.getElementById('averageRatingChart').getContext('2d');
 const averageRatingChart = new Chart(ctx2, {
     type: 'doughnut',
     data: {
         labels: ['5 estrellas', '4 estrellas', '3 estrellas', '2 estrellas', '1 estrella'],
         datasets: [{
             label: 'Calificación Promedio',
             data: [50, 30, 10, 5, 5], // Datos de ejemplo
             backgroundColor: [
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)'
             ],
             borderColor: [
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)',
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)'
             ],
             borderWidth: 1
         }]
     },
     options: {
         responsive: true
     }
 });