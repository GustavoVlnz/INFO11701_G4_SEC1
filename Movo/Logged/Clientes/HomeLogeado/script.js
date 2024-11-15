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

    // --- Funcionalidad del botón "Descubre Más" ---
    const DescubreMasBtn = document.getElementById('descubre-mas'); // Botón para mostrar/ocultar información
    const SeccionInfo = document.getElementById('mas-info'); // Sección de información que se muestra/oculta
    const SeccionServicio = document.getElementById('seccion-servicio'); // Sección del carrusel de servicios

    DescubreMasBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace

        // Alterna la visibilidad de la sección de información y la sección de servicios
        if (SeccionInfo.classList.contains('hidden')) {
            SeccionInfo.classList.remove('hidden');
            SeccionInfo.classList.add('visible');
            SeccionServicio.classList.remove('hidden');
            DescubreMasBtn.textContent = 'Ocultar Información';
        } else {
            SeccionInfo.classList.remove('visible');
            SeccionInfo.classList.add('hidden');
            SeccionServicio.classList.add('hidden');
            DescubreMasBtn.textContent = 'Descubre Más';
        }
    });

    // --- Funcionalidad del carrusel de imágenes ---
    let slideIndex = 0;
    showSlides(slideIndex); // Muestra la diapositiva inicial

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Oculta todas las diapositivas
        }
        slides[slideIndex].style.display = "block"; // Muestra la diapositiva actual
    }

    function moveSlide(n) {
        showSlides(slideIndex += n); // Actualiza el índice de la diapositiva y muestra la nueva diapositiva
    }

    window.moveSlide = moveSlide; // Exponer la función para los botones de navegación del carrusel

    // --- Funcionalidad para el formulario y cambios de color del botón ---
    function showAlertOnSubmit(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('telefono').value;
        const selectElement = document.getElementById('options');
        const optionText = selectElement.options[selectElement.selectedIndex].text;
        const message = document.getElementById('message').value;

        alert(`Nombres: ${name}\nApellidos: ${lastname}\nEmail: ${email}\nTelefono: ${phone}\nMotivo: ${optionText}\nMensaje: ${message}`);
    }

    document.getElementById('contactForm').addEventListener('submit', showAlertOnSubmit);

    function changeButtonColorOnHover() {
        this.style.backgroundColor = 'royalblue'; // Cambia el color al pasar el mouse
    }

    function restoreButtonColor() {
        this.style.backgroundColor = '#333'; // Restaura el color original al salir el mouse
    }

    const submitButton = document.querySelector('#contactForm input[type="submit"]'); // Selector más específico
    submitButton.addEventListener('mouseover', changeButtonColorOnHover);
    submitButton.addEventListener('mouseout', restoreButtonColor);

    // --- Funcionalidad para mostrar más información de las noticias ---
    const readMoreButtons = document.querySelectorAll('.btn-leer-mas');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace

            const moreInfo = button.closest('.noticias-post').querySelector('.masInfo'); // Selecciona la sección de más información

            if (moreInfo.classList.contains('hidden')) {
                moreInfo.classList.remove('hidden');
                moreInfo.classList.add('visible');
                button.textContent = 'Ocultar'; // Cambia el texto del botón
            } else {
                moreInfo.classList.remove('visible');
                moreInfo.classList.add('hidden');
                button.textContent = 'Leer más'; // Cambia el texto del botón de vuelta
            }
        });
    });

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
});
