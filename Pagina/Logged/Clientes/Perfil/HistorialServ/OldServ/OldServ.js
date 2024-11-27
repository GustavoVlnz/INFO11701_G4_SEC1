// JavaScript para obtener y mostrar servicios
document.addEventListener("DOMContentLoaded", function() {
    // Contenedor de los servicios
    const contenedorServicios = document.querySelector(".historial .row");

    // Obtener servicios desde la base de datos
    fetch("OldServ.php")
        .then(response => response.json())
        .then(data => {
            // Crear tarjetas para cada servicio recibido
            data.forEach(servicio => {
                const card = document.createElement("div");
                card.classList.add("col-md-6", "mb-4");

                // Crear contenido de la tarjeta
                card.innerHTML = `
                    <div class="card shadow-sm border-light">
                        <div class="card-body">
                            <h5 class="card-title">${servicio.nombre_servicio}</h5>
                            <p class="card-text text-muted">Fecha: ${servicio.fecha_completado}</p>
                            <p class="card-text"><strong>Precio:</strong> $${servicio.precio}</p>
                            <p class="card-text"><strong>Estado:</strong> ${servicio.estado}</p>
                            <button class="btn btn-outline-primary btn-sm">Ver detalles</button>
                        </div>
                    </div>
                `;

                // Añadir la tarjeta al contenedor
                contenedorServicios.appendChild(card);
            });
        })
        .catch(error => console.error("Error al obtener los servicios:", error));
});
