window.onload = function() {
    let progreso = 0; // Inicializa el progreso en 0
    let barra = document.getElementById("barra-progreso");
    let estadoServicio = document.getElementById("estado-servicio");

    // Función que actualiza el progreso
    function avanzarProgreso() {
        if (progreso >= 100) {
            clearInterval(intervalo); // Detiene el temporizador cuando se alcanza el 100%
            estadoServicio.textContent = "Servicio Completado";
            return;
        }
        progreso += 1; // Incrementa el progreso en 1
        barra.style.width = progreso + "%"; // Actualiza el ancho de la barra
        barra.textContent = progreso + "%"; // Muestra el porcentaje dentro de la barra
    }

    // Simula el progreso automático (aumenta cada 100ms)
    let intervalo = setInterval(avanzarProgreso, 200); // Cambia el tiempo según sea necesario
};
