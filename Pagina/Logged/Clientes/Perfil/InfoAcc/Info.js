function habilitarEdicion() {
    document.getElementById("nombres").disabled = false;
    document.getElementById("apellidos").disabled = false;
    document.getElementById("genero").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("direccion").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("guardarBtn").style.display = "inline";
}

function mostrarToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 5000 });  // Duración de 5 segundos
    toast.show();
}


function guardarCambios() {
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const genero = document.getElementById("genero").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    fetch("actualizar_perfil.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nombres=${encodeURIComponent(nombres)}&apellidos=${encodeURIComponent(apellidos)}&genero=${encodeURIComponent(genero)}&email=${encodeURIComponent(email)}&direccion=${encodeURIComponent(direccion)}&telefono=${encodeURIComponent(telefono)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Verificar el mensaje en la consola
        mostrarToast(data);  // Mostrar el mensaje en el Toast
        setTimeout(() => location.reload(), 3000); 
    })
    .catch(error => console.error("Error:", error));
}

function validarTelefono(input) {
    // Eliminar caracteres no numéricos, excepto el prefijo + y espacios
    input.value = input.value.replace(/[^\d\s\+]/g, "");

    // Validar el formato específico
    const regex = /^\+56 9 \d{4} \d{4}$/;
    if (!regex.test(input.value)) {
        input.setCustomValidity("Formato inválido. Use el formato +569");
    } else {
        input.setCustomValidity("");
    }
}

/*Notificaciones */ 
document.addEventListener('DOMContentLoaded', () => {
    // Pestañas
    const noLeidasTab = document.getElementById('no-leidas-tab'); // Pestaña "No Leídas"
    const todasTab = document.getElementById('todas-tab'); // Pestaña "Todas"
    
    // Contenidos
    const todasContent = document.getElementById('lista-notificaciones-todas');
    const noLeidasContent = document.getElementById('no-leidas');

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

    // Llamadas a la función para mostrar las notificaciones
    showNotifications(); // Llamada inicial al cargar la página

    // --- Función para agregar nuevas notificaciones --- 
    function agregarNotificacion(texto, leida = false) {
        notifications.push({ text: texto, isRead: leida });
        showNotifications(); // Volver a mostrar las notificaciones actualizadas
        actualizarNotificaciones(); // Actualizar visibilidad
    }

    // Ejemplo para agregar nuevas notificaciones
    agregarNotificacion("Pedido confirmado, en espera de pago");
    agregarNotificacion("Tu pedido está en preparación", true); // Ejemplo de notificación leída
    agregarNotificacion("El pedido ha sido enviado");
    agregarNotificacion("Tu pedido está en camino", true); // Ejemplo de notificación leída

    // Mostrar solo las notificaciones no leídas al cargar la página
    actualizarNotificaciones(); // Asegura que la visibilidad esté correcta desde el inicio

    // --- Limpiar todas las notificaciones ---
    document.getElementById('limpiar-notificaciones-btn').addEventListener('click', function() {
        notifications = []; // Vaciar el array de notificaciones
        showNotifications(); // Volver a mostrar las notificaciones (vacías)
        actualizarNotificaciones(); // Actualizar visibilidad
    });
});

