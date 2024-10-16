// Evitar inicializar el calendario varias veces
let calendarioInicializado = false;

document.getElementById("ver_horarios").addEventListener("click", function() {
    const calendario = document.getElementById("calendario");

    // Muestra el calendario con una transición suave
    calendario.classList.add("visible");

    // Inicializa el calendario solo si no está ya inicializado
    if (!calendarioInicializado) {
        flatpickr("#calendario", {
            enableTime: true,  // Permite seleccionar la hora
            dateFormat: "Y-m-d H:i",  // Formato de fecha y hora
            minDate: "today",  // No permite seleccionar fechas pasadas
        });
        calendarioInicializado = true;
    }
});

// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calificacionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío normal del formulario

        // Crear un objeto FormData para enviar el formulario
        const formData = new FormData(form);

        // Enviar el formulario usando fetch
        fetch('detalles_pedido.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Suponiendo que `data` contiene el HTML de la nueva reseña
            const reseñaDiv = document.createElement('div');
            reseñaDiv.className = 'reseña';
            reseñaDiv.innerHTML = data; // Aquí se inserta la respuesta del servidor
            document.querySelector('.calificaciones').appendChild(reseñaDiv);

            // Limpiar el formulario
            form.reset();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
        });
    });
});

