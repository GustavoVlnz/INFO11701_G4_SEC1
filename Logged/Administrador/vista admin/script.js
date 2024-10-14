
function mostrarDetalles(id) {
    const detalles = document.getElementById(`detalles-${id}`);
    if (detalles.style.display === "none" || detalles.style.display === "") {
        detalles.style.display = "block";
    } else {
        detalles.style.display = "none";
    }
}

function verEstado(id) {
    const estadoReporte = document.getElementById(`estado-${id}`);
    if (estadoReporte.style.display === "none" || estadoReporte.style.display === "") {
        estadoReporte.style.display = "block";
    } else {
        estadoReporte.style.display = "none";
    }
}
