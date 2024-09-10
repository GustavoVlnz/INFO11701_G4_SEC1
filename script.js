// Espera a que el contenido del documento esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos del DOM que se usarán
    const DescubreMasBtn = document.getElementById('descubre-mas'); // Botón para mostrar/ocultar información
    const SeccionInfo = document.getElementById('mas-info'); // Sección de información que se muestra/oculta
    const SeccionServicio = document.getElementById('seccion-servicio'); // Sección de muestra de servicios

    // Agrega un evento de clic al botón "Descubre Más"
    DescubreMasBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace (navegar a otro lugar)

        // Alterna la visibilidad de la sección de información y la sección de servicios
        if (SeccionInfo.classList.contains('hidden')) { // Si la sección de información está oculta
            SeccionInfo.classList.remove('hidden'); // Elimina la clase 'hidden'
            SeccionInfo.classList.add('visible'); // Añade la clase 'visible'
            SeccionServicio.classList.remove('hidden'); // Asegura que la sección de servicios esté visible
            DescubreMasBtn.textContent = 'Ocultar Información'; // Cambia el texto del botón a "Ocultar Información"
        } else { // Si la sección de información está visible
            SeccionInfo.classList.remove('visible'); // Elimina la clase 'visible'
            SeccionInfo.classList.add('hidden'); // Añade la clase 'hidden'
            SeccionServicio.classList.add('hidden'); // Oculta la sección de servicios
            DescubreMasBtn.textContent = 'Descubre Más'; // Cambia el texto del botón de vuelta a "Descubre Más"
        }
    });

    // Inicializa el índice de la diapositiva para la muestra de servicios
    let slideIndex = 0;
    showSlides(slideIndex); // Muestra la diapositiva inicial

    // Función para mostrar las diapositivas de la muestra de servicios
    function showSlides(n) {
        let slides = document.getElementsByClassName("slide"); // Obtiene todas las diapositivas
        if (n >= slides.length) { slideIndex = 0; } // Si el índice es mayor o igual al número de diapositivas, reinicia al inicio
        if (n < 0) { slideIndex = slides.length - 1; } // Si el índice es menor que 0, va a la última diapositiva
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Oculta todas las diapositivas
        }
        slides[slideIndex].style.display = "block"; // Muestra la diapositiva actual
    }

    // Función para mover las diapositivas
    function moveSlide(n) {
        showSlides(slideIndex += n); // Actualiza el índice de la diapositiva y muestra la nueva diapositiva
    }

    // Exponer la función moveSlide a nivel global para los botones de navegación del carrusel
    window.moveSlide = moveSlide;
});
