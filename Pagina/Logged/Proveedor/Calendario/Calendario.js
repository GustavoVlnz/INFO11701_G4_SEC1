// Array de eventos (puedes modificarlo con eventos dinámicos)
const eventos = [
    { fecha: '2024-11-22', titulo: 'Reunión de equipo' },
    { fecha: '2024-11-25', titulo: 'Entrega de proyecto' }
];

// Función para mostrar eventos
function mostrarEventos(fechaSeleccionada) {
    const listaEventos = document.getElementById('event-list');
    listaEventos.innerHTML = ''; // Limpia la lista

    // Filtra eventos por la fecha seleccionada
    const eventosFiltrados = eventos.filter(evento => evento.fecha === fechaSeleccionada);

    // Agrega eventos a la lista
    if (eventosFiltrados.length > 0) {
        eventosFiltrados.forEach(evento => {
            const li = document.createElement('li');
            li.textContent = evento.titulo;
            listaEventos.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No hay eventos para esta fecha.';
        listaEventos.appendChild(li);
    }
}

// Función para agregar un nuevo evento
document.getElementById('add-event-btn').addEventListener('click', function() {
    const titulo = document.getElementById('event-title').value;
    const fechaSeleccionada = document.getElementById('datepicker').value;

    // Validar que se haya ingresado un título y una fecha
    if (titulo && fechaSeleccionada) {
        // Agregar evento al array de eventos
        eventos.push({
            fecha: fechaSeleccionada,
            titulo: titulo
        });

        // Limpiar el campo de entrada
        document.getElementById('event-title').value = '';

        // Mostrar los eventos de la fecha seleccionada
        mostrarEventos(fechaSeleccionada);

        alert('Evento agregado exitosamente!');
    } else {
        alert('Por favor complete todos los campos.');
    }
});

// Inicializa Pikaday
const picker = new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'YYYY-MM-DD',
    onSelect: function (date) {
        // Convierte la fecha seleccionada a formato YYYY-MM-DD
        const fechaSeleccionada = this.toString('YYYY-MM-DD');
        mostrarEventos(fechaSeleccionada);
    }
});
