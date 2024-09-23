let progreso = 0;
const barraProgreso = document.getElementById('barra-progreso');
const estadoServicio = document.getElementById('estado-servicio');

const ProgresoActualizado = setInterval(() => {
    if (progreso < 100) {
        progreso += 10;
        barraProgreso.style.width = progreso + '%';
        if (progreso === 100) {
            estadoServicio.textContent = "Servicio Completado";
        } else if (progreso >= 40) {
            estadoServicio.textContent = "Servicio en Proceso...";
        } else {
            estadoServicio.textContent = "Prestador en Camino...";
        }
    } else {
        clearInterval(ProgresoActualizado);
    }
}, 2000);
