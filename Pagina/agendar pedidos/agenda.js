document.addEventListener('DOMContentLoaded', () => {
    const horariosDisponibles = generarHorariosDisponibles();
    const tablaHorarios = document.getElementById('tabla-horarios').querySelector('tbody');

    horariosDisponibles.forEach(horario => {
        const nuevaFila = document.createElement('tr');

        nuevaFila.innerHTML = `
            <td>${horario.fecha}</td>
            <td>${horario.horaInicio}</td>
            <td>${horario.horaFin}</td>
            <td><button class="btn-seleccionar">Seleccionar</button></td>
        `;

        nuevaFila.querySelector('.btn-seleccionar').addEventListener('click', function() {
            alert(`Has seleccionado el horario: ${horario.fecha} de ${horario.horaInicio} a ${horario.horaFin}`);
        });

        tablaHorarios.appendChild(nuevaFila);
    });

    // Evento para volver a detalles del pedido
    document.getElementById('btn-detalles').addEventListener('click', function() {
        window.location.href = '/Pagina Oficial/DetallesPedido/detalles.html'; // Cambia esto a la URL real de la página de detalles
    });
});

// Función para generar horarios disponibles al azar
function generarHorariosDisponibles() {
    const horarios = [];
    const fechaBase = new Date();
    
    for (let i = 0; i < 5; i++) { // Generar 5 horarios
        const fecha = new Date(fechaBase);
        fecha.setDate(fecha.getDate() + i); // Añadir días

        const horaInicio = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
        const horaFin = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

        horarios.push({
            fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
            horaInicio,
            horaFin
        });
    }

    return horarios;
}
