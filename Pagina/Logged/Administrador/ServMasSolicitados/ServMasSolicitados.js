
let ordenAscendente = true; // Variable para controlar el orden actual

document.getElementById("ordenar-servicios").addEventListener("click", function() {
    const tableBody = document.getElementById("tabla-servicios-solicitados");
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    
    // Ordenar filas basadas en la columna "Cantidad Solicitada"
    rows.sort((a, b) => {
        const cantidadA = parseInt(a.cells[1].textContent);
        const cantidadB = parseInt(b.cells[1].textContent);
        return ordenAscendente ? cantidadA - cantidadB : cantidadB - cantidadA;
    });
    
    // Cambiar el orden de las filas en la tabla
    rows.forEach(row => tableBody.appendChild(row));

    // Cambiar la dirección de la flecha
    const flecha = document.getElementById("flecha-orden");
    flecha.textContent = ordenAscendente ? "▲" : "▼";

    // Alternar el valor de la variable para el siguiente clic
    ordenAscendente = !ordenAscendente;
});

document.getElementById("filtro-servicio").addEventListener("input", function() {
    const filtro = this.value.toLowerCase(); // Valor del filtro en minúsculas
    const filas = document.querySelectorAll("#tabla-servicios-solicitados tr");

    filas.forEach(fila => {
        const servicio = fila.cells[0].textContent.toLowerCase(); // Obtiene el texto de la primera columna
        // Muestra u oculta la fila según coincida o no con el filtro
        fila.style.display = servicio.includes(filtro) ? "" : "none";
    });
});

