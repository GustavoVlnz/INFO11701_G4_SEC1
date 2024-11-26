// JavaScript para obtener y mostrar reseñas
document.addEventListener("DOMContentLoaded", function() {
    // Contenedor de las reseñas
    const contenedorResenas = document.querySelector(".historial .row");

    // Obtener reseñas de la base de datos
    fetch("OldRes.php")
        .then(response => response.json())
        .then(data => {
            // Crear tarjetas para cada reseña recibida
            data.forEach(resena => {
                const card = document.createElement("div");
                card.classList.add("col-md-6", "mb-4");

                // Crear contenido de la tarjeta
                card.innerHTML = `
                    <div class="card shadow-sm border-light">
                        <div class="card-body">
                            <h5 class="card-title">${resena.servicio}</h5>
                            <p class="card-text text-muted">Fecha: ${resena.fecha}</p>
                            <p class="card-text"><strong>Calificación:</strong> ${"⭐".repeat(resena.calificacion)}${"☆".repeat(5 - resena.calificacion)}</p>
                            <p class="card-text"><strong>Comentario:</strong> ${resena.comentario}</p>
                        </div>
                    </div>
                `;

                // Añadir la tarjeta al contenedor
                contenedorResenas.appendChild(card);
            });
        })
        .catch(error => console.error("Error al obtener las reseñas:", error));
});
