document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad para mostrar/ocultar la bandeja de notificaciones ---
    document.getElementById('boton-notificaciones').addEventListener('click', () => {
        const bandeja = document.getElementById('bandeja-notificaciones');
        bandeja.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar
        bandeja.classList.toggle('hidden'); // Alterna la clase 'hidden' para ocultar/mostrar
    });

    // --- Opción de limpiar notificaciones ---
    document.getElementById('limpiar-notificaciones').addEventListener('click', () => {
        const lista = document.getElementById('lista-notificaciones');
        lista.innerHTML = ''; // Elimina todas las notificaciones
    });

    // --- Eliminar notificación al hacer clic en la "X" ---
    document.querySelectorAll('.delete-icon').forEach((icono) => {
        icono.addEventListener('click', (e) => {
            const notificacion = e.target.closest('.notificacion-item'); // Encuentra el contenedor de la notificación
            notificacion.remove(); // Elimina la notificación
        });
    });

    // --- Funcionalidad "Descubre Más" ---
    const DescubreMasBtn = document.getElementById('descubre-mas');
    const SeccionInfo = document.getElementById('mas-info');
    const SeccionServicio = document.getElementById('seccion-servicio');

    DescubreMasBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace (navegar a otro lugar)
        
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

    // --- Funcionalidad "Leer Más" ---
    const readMoreButtons = document.querySelectorAll('.btn-leer-mas');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace

            const moreInfo = button.closest('.noticias-post').querySelector('.masInfo'); // Selecciona la sección de más información correspondiente

            if (moreInfo.classList.contains('hidden')) { // Si la sección está oculta
                moreInfo.classList.remove('hidden'); // Muestra la información
                moreInfo.classList.add('visible'); // (opcional) añade clase visible si necesitas estilos específicos
                button.textContent = 'Ocultar'; // Cambia el texto del botón
            } else {
                moreInfo.classList.remove('visible'); // (opcional) quita clase visible si la usaste
                moreInfo.classList.add('hidden'); // Oculta la información
                button.textContent = 'Leer más'; // Cambia el texto del botón de vuelta
            }
        });
    });

    // Función para mostrar las diapositivas del carrusel
    let slideIndex = 0;
    showSlides(slideIndex); // Muestra la diapositiva inicial

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide"); // Obtiene todas las diapositivas
        if (n >= slides.length) { slideIndex = 0; } // Si el índice es mayor o igual al número de diapositivas, reinicia al inicio
        if (n < 0) { slideIndex = slides.length - 1; } // Si el índice es menor que 0, va a la última diapositiva
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Oculta todas las diapositivas
        }
        slides[slideIndex].style.display = "block"; // Muestra la diapositiva actual
    }

    // Función para mover las diapositivas del carrusel
    function moveSlide(n) {
        showSlides(slideIndex += n); // Actualiza el índice de la diapositiva y muestra la nueva diapositiva
    }

    // Exponer la función moveSlide a nivel global para los botones de navegación del carrusel
    window.moveSlide = moveSlide;

    // --- Función para agregar nuevas notificaciones ---
    function agregarNotificacion(texto) {
        const lista = document.getElementById('lista-notificaciones');
        
        // Crear el elemento de la notificación
        const notificacionItem = document.createElement('li');
        notificacionItem.classList.add('notificacion-item');
        
        // Crear la estructura de la notificación
        notificacionItem.innerHTML = `
            <div class="notificacion-text">${texto}</div>
            <i class="delete-icon fas fa-trash" onclick="eliminarNotificacion(event)"></i>
        `;
        
        // Añadir la notificación a la lista
        lista.prepend(notificacionItem); // Añadir al principio para que aparezcan más recientes
    }

    // --- Llamadas a la función para agregar nuevas notificaciones ---
    agregarNotificacion("Pedido confirmado, en espera de pago");
    agregarNotificacion("Tu pedido está en preparación");
    agregarNotificacion("El pedido ha sido enviado");
    agregarNotificacion("Tu pedido está en camino");

    // Función para cambiar el color del botón al pasar el mouse sobre él
    function changeButtonColorOnHover() {
        this.style.backgroundColor = 'royalblue';
    }

    // Función para restaurar el color original del botón al salir el mouse
    function restoreButtonColor() {
        this.style.backgroundColor = '#333';
    }

    // Obtener el botón de envío del formulario y agregar los eventos
    const submitButton = document.querySelector('#contactForm input[type="submit"]'); // Selector más específico

    submitButton.addEventListener('mouseover', changeButtonColorOnHover);
    submitButton.addEventListener('mouseout', restoreButtonColor);

});
