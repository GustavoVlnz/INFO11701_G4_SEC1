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