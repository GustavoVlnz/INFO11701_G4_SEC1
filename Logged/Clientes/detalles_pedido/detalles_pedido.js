document.getElementById("ver_horarios").addEventListener("click", function() {
    const calendario = document.getElementById("calendario");

    // Muestra el calendario con una transición suave
    calendario.classList.add("visible");

    // Inicializa el calendario usando Flatpickr
    flatpickr("#calendario", {
        enableTime: true,  // Permite seleccionar la hora
        dateFormat: "Y-m-d H:i",  // Formato de fecha y hora
        minDate: "today",  // No permite seleccionar fechas pasadas
    });
});

// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const reseñasContainer = document.querySelector(".calificaciones");
    const form = document.querySelector("form");

    // Función para agregar reseña
    function agregarReseña(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Recoger los datos del formulario
        const usuario = event.target.usuario.value;
        const calificacion = event.target.calificacion.value;
        const comentario = event.target.comentario.value;

        // Crear el elemento de reseña
        const reseñaDiv = document.createElement("div");
        reseñaDiv.classList.add("reseña");
        reseñaDiv.innerHTML = `
            <h4>${usuario}</h4>
            <p class="fecha">${new Date().toLocaleDateString("es-ES")}</p>
            <p class="comentario">${comentario}</p>
        `;

        // Agregar la nueva reseña al contenedor
        reseñasContainer.appendChild(reseñaDiv);

        // Limpiar el formulario
        form.reset();
    }

    // Agregar el evento de envío al formulario
    form.addEventListener("submit", agregarReseña);
});