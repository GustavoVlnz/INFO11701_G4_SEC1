document.addEventListener("DOMContentLoaded", () => {
    const pendientesTab = document.getElementById("pendientes");
    const finalizadosTab = document.getElementById("finalizados");

    // Función para renderizar servicios
    const renderServicios = (container, servicios, finalizado = false) => {
        servicios.forEach((servicio, index) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            card.style.opacity = 0; // Para animación inicial

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = servicio.servicio_solicitado;

            const fecha = document.createElement("p");
            fecha.className = "card-text";
            fecha.innerHTML = `Fecha de solicitud: <b>${servicio.fecha_solicitud}</b>`;

            const estado = document.createElement("p");
            estado.className = "card-text";
            estado.innerHTML = `Estado: <b>${servicio.estado_solicitud}</b>`;

            const progress = document.createElement("div");
            progress.className = "progress";

            const progressBar = document.createElement("div");
            progressBar.className = `progress-bar ${finalizado ? "bg-success" : "bg-warning"}`;
            progressBar.style.width = "0%"; // Inicia en 0 para animación
            progressBar.dataset.targetWidth = finalizado ? "100%" : "50%";

            progress.appendChild(progressBar);
            cardBody.appendChild(title);
            cardBody.appendChild(fecha);
            cardBody.appendChild(estado);
            cardBody.appendChild(progress);
            card.appendChild(cardBody);

            container.appendChild(card);

            // Animación de entrada con GSAP
            gsap.to(card, {
                opacity: 1,
                y: 0,
                delay: index * 0.2,
                duration: 0.8,
                ease: "power3.out",
                onStart: () => {
                    card.style.transform = "translateY(30px)";
                }
            });

            // Animación de la barra de progreso
            gsap.to(progressBar, {
                width: progressBar.dataset.targetWidth,
                duration: 1.5,
                delay: index * 0.2 + 0.5,
                ease: "power2.inOut"
            });
        });
    };

    // Renderizar servicios
    renderServicios(pendientesTab, serviciosPendientes);
    renderServicios(finalizadosTab, serviciosFinalizados, true);
});
