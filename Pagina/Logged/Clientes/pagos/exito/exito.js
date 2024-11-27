document.addEventListener('DOMContentLoaded', () => {
    const processingSection = document.getElementById('processingSection');
    const successSection = document.getElementById('successSection');
    const processingText = document.getElementById('processingText');
    const successMessage = document.getElementById('successMessage');
    const detallePedidoButton = document.getElementById("detallePedidoButton");
    const homeButton = document.getElementById('homeButton');

    // Muestra la sección de procesamiento con efectos complejos
    gsap.set(processingSection, { display: 'block', opacity: 0, scale: 0.5 });
    gsap.to(processingSection, { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: 'back.out(1.7)', 
        onComplete: () => {
            // Aparece texto de procesamiento con un efecto de rebote más lento
            gsap.to(processingText, { 
                opacity: 1, 
                y: -10, 
                duration: 1.1, // 0.1 segundos más lento
                repeat: -1, 
                yoyo: true, 
                ease: 'power1.inOut' 
            });

            // Simula tiempo de procesamiento (4.5 segundos)
            setTimeout(() => {
                // Oculta la sección de procesamiento con un efecto más avanzado
                gsap.to(processingSection, { 
                    opacity: 0, 
                    scale: 0.8, 
                    rotationX: 180, 
                    duration: 0.8, 
                    ease: 'power4.in', 
                    onComplete: () => {
                        gsap.set(processingSection, { display: 'none' });

                        // Muestra la sección de éxito con una animación combinada
                        gsap.set(successSection, { 
                            display: 'block', 
                            opacity: 0, 
                            scale: 0.8, 
                            y: 50, 
                            rotationX: -90 
                        });
                        gsap.to(successSection, { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            rotationX: 0, 
                            duration: 1.5, 
                            ease: 'elastic.out(1, 0.7)' 
                        });

                        // Animación final del mensaje de éxito sin parpadeo
                        gsap.to(successMessage, { 
                            opacity: 1, 
                            duration: 1, 
                            delay: 0.3, 
                            ease: 'power2.inOut' 
                        });

                        // Muestra el botón de "Volver al Home" junto al texto final
                        gsap.set(homeButton, { display: 'block', opacity: 0, y: 20, scale: 0.7 });
                        gsap.to(homeButton, { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            duration: 1, 
                            delay: 0.5, 
                            ease: 'back.out(1.7)' 
                        });
                        gsap.to(detallePedidoButton, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            onStart: () => {
                                detallePedidoButton.classList.remove("hidden");
                            }
                        });
                    }
                });
            }, 5500); // Procesamiento ahora dura 4.5 segundos (3 + 1.5)
        }
    });

    // Agrega evento al botón de "Volver al Home"
    homeButton.addEventListener('click', () => {
        window.location.href = '../../HomeLogeado/home.html'; // Ajusta '/' según la URL de tu página de inicio
    });
    
    detallePedidoButton.addEventListener("click", () => {
        window.location.href = "../../progreso_y_detalles/progresoPedido.php"; // Redirige al Detalle del Pedido
    });
});
