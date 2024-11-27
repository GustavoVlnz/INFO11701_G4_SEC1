document.addEventListener('DOMContentLoaded', () => {
    const readMoreButtons = document.querySelectorAll('.btn-leer-mas');
    const toggleButton = document.getElementById('descubre-mas');
    const infoSection = document.getElementById('mas-info');

    // Añadir un evento de clic al botón
    toggleButton.addEventListener('click', () => {
        // Alternar la clase 'hidden'
        infoSection.classList.toggle('hidden');

        // Cambiar el texto del botón según el estado
        if (infoSection.classList.contains('hidden')) {
            toggleButton.textContent = 'Descubre más';
        } else {
            toggleButton.textContent = 'Ocultar';
        }
    });

    readMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace navegue a otra página

            // Encuentra el contenedor de más información correspondiente al botón
            const moreInfo = button.closest('.card').querySelector('.masInfo');

            if (moreInfo.classList.contains('hidden')) {
                moreInfo.classList.remove('hidden'); // Muestra la información
                moreInfo.classList.add('visible'); // Opcional: agregar una clase visible si tienes estilos específicos
                button.textContent = 'Ocultar'; // Cambia el texto del botón
            } else {
                moreInfo.classList.remove('visible'); // Opcional: remover clase visible si tienes estilos específicos
                moreInfo.classList.add('hidden'); // Oculta la información
                button.textContent = 'Leer más'; // Cambia el texto del botón de vuelta
            }
        });
    });
    // --- Funcionalidad para mostrar/ocultar la bandeja de notificaciones ---
    document.getElementById('boton-notificaciones').addEventListener('click', () => {
        const bandeja = document.getElementById('bandeja-notificaciones');
        bandeja.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar
        bandeja.classList.toggle('hidden'); // Alterna la clase 'hidden' para ocultar/mostrar
    });

    // Suponiendo que las notificaciones se almacenan en un array de objetos
    let notifications = [
        { id: 1, text: 'Nueva solicitud de servicio', isRead: false },
        { id: 2, text: 'Nuevo mensaje de cliente', isRead: true },
        { id: 3, text: 'Pedido confirmado, en espera de pago', isRead: false }
    ];

    // Función para mostrar todas las notificaciones
    function showNotifications() {
        const containerTodas = document.getElementById('lista-notificaciones-todas'); // Sección donde se mostrarán todas las notificaciones
        const containerNoLeidas = document.getElementById('no-leidas'); // Sección donde se mostrarán las no leídas

        // Limpiar las secciones antes de agregar las nuevas
        containerTodas.innerHTML = '';
        containerNoLeidas.innerHTML = '';

        notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.classList.add('notificacion-item');
            if (notification.isRead) {
                notificationElement.classList.add('leida');
            } else {
                notificationElement.classList.add('no-leida');
            }
            notificationElement.innerHTML = `<p>${notification.text}</p>`; // Sin el botón de eliminación

            // Añadir la notificación a ambas secciones
            containerTodas.appendChild(notificationElement);
            if (!notification.isRead) {
                containerNoLeidas.appendChild(notificationElement); // Añadir solo las no leídas a la sección "No Leídas"
            }
        });
    }

    // Función para actualizar la visibilidad de las notificaciones
    function actualizarNotificaciones() {
        const noLeidas = document.querySelectorAll('.notificacion-item.no-leida');
        const todas = document.querySelectorAll('.notificacion-item');

        // Mostrar todas las notificaciones
        todas.forEach(item => item.style.display = 'block');
        
        // Mostrar solo las notificaciones no leídas cuando estamos en la pestaña "No Leídas"
        if (noLeidasContent.classList.contains('visible')) {
            noLeidas.forEach(item => item.style.display = 'block');  // Mostrar no leídas
            todas.forEach(item => {
                if (!item.classList.contains('no-leida')) {
                    item.style.display = 'none'; // Ocultar las leídas
                }
            });
        }
    }

    // Manejo del clic en la pestaña "No Leídas"
    noLeidasTab.addEventListener('click', () => {
        // Cambiar el color de las pestañas
        noLeidasTab.classList.add('active');
        todasTab.classList.remove('active');
        
        // Mostrar contenido de "No Leídas" y ocultar "Todas"
        noLeidasContent.classList.add('visible');
        todasContent.classList.remove('visible');
        
        actualizarNotificaciones(); // Actualizar notificaciones al hacer clic
    });

    // Manejo del clic en la pestaña "Todas"
    todasTab.addEventListener('click', () => {
        // Cambiar el color de las pestañas
        todasTab.classList.add('active');
        noLeidasTab.classList.remove('active');
        
        // Mostrar contenido de "Todas" y ocultar "No Leídas"
        todasContent.classList.add('visible');
        noLeidasContent.classList.remove('visible');
        
        actualizarNotificaciones(); // Actualizar notificaciones al hacer clic
    });

    // Funcionalidad para mostrar/ocultar la bandeja de notificaciones
    document.getElementById('notificaciones-btn').addEventListener('click', function() {
        var notificationDropdown = document.querySelector('.dropdown-notificaciones');
        notificationDropdown.classList.toggle('visible');
    });

    // Cierra la bandeja si se hace clic fuera de ella
    document.addEventListener('click', (event) => {
        const notificacionesBtn = document.getElementById('notificaciones-btn');
        const notificationDropdown = document.querySelector('.dropdown-notificaciones');
        if (!notificacionesBtn.contains(event.target) && !notificationDropdown.contains(event.target)) {
            notificationDropdown.classList.remove('visible');
        }
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
