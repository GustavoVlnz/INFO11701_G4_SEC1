document.addEventListener('DOMContentLoaded', function () {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito-btn');
    const listaCarrito = document.getElementById('lista-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    const botonPagar = document.getElementById('boton-pagar');
    const botonesDetalles = document.querySelectorAll('.ver-detalles-btn');
    const serviciosEnCarrito = new Set(); // Set para evitar duplicados

    /**
     * Actualizar el estado del botón "Pagar"
     */
    function actualizarBotonPagar() {
        if (listaCarrito.children.length > 0) {
            botonPagar.style.display = 'inline-block';
            carritoVacio.style.display = 'none';
        } else {
            botonPagar.style.display = 'none';
            carritoVacio.style.display = 'block';
        }
    }

    /**
     * Agregar servicio al carrito
     */
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const servicioId = this.dataset.idServicio;
            const categoriaId = this.dataset.idCategoria;
            const cardBody = this.closest('.card-body');
            const selectProveedor = cardBody.querySelector('.select-proveedor');

            if (!selectProveedor || selectProveedor.value === '') {
                alert('Por favor, seleccione un proveedor antes de agregar.');
                return;
            }

            const prestadorId = selectProveedor.value; // ID del prestador
            const proveedorSeleccionado = selectProveedor.options[selectProveedor.selectedIndex].text;
            const [nombrePrestador, precioServicio] = proveedorSeleccionado.split(' - $');

            const servicioKey = `${servicioId}-${prestadorId}`;

            if (serviciosEnCarrito.has(servicioKey)) {
                alert('Este servicio ya está en el carrito.');
                return;
            }

            // Crear elemento de lista para el carrito
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center animate-add';
            li.dataset.servicioId = servicioId;
            li.dataset.prestadorId = prestadorId;
            li.dataset.categoriaId = categoriaId;

            li.innerHTML = `
                <div>
                    <p><strong>Servicio:</strong> ${servicioId}</p>
                    <p><strong>Proveedor:</strong> ${nombrePrestador}</p>
                    <p><strong>Precio:</strong> $${precioServicio}</p>
                </div>
                <button class="btn btn-danger btn-sm eliminar-carrito-btn">Eliminar</button>
            `;

            // Evento para eliminar del carrito
            const botonEliminar = li.querySelector('.eliminar-carrito-btn');
            botonEliminar.addEventListener('click', () => {
                li.classList.add('animate-remove');
                li.addEventListener('animationend', () => {
                    li.remove();
                    serviciosEnCarrito.delete(servicioKey);
                    actualizarBotonPagar();
                });
            });

            listaCarrito.appendChild(li);
            serviciosEnCarrito.add(servicioKey);
            actualizarBotonPagar();
        });
    });

    /**
     * Ver detalles del servicio seleccionado
     */
    botonesDetalles.forEach(boton => {
        boton.addEventListener('click', function () {
            const servicioId = this.dataset.idServicio;
            const categoriaId = this.dataset.idCategoria;
            const cardBody = this.closest('.card-body');
            const selectProveedor = cardBody.querySelector('.select-proveedor');

            if (!selectProveedor || selectProveedor.value === '') {
                alert('Por favor, seleccione un proveedor.');
                return;
            }

            const prestadorId = selectProveedor.value;

            // Redirigir a la página de detalles del servicio
            const enlace = `../detalle_pedido/detalle.php?proveedor_id=${prestadorId}&id_categoria=${categoriaId}&id_servicio=${servicioId}`;
            window.location.href = enlace;
        });
    });

    /**
     * Procesar el pago
     */
    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            const servicios = [];
            const carritoItems = listaCarrito.querySelectorAll('.list-group-item');

            carritoItems.forEach(item => {
                const servicioId = item.dataset.servicioId;
                const proveedorId = item.dataset.prestadorId;

                // Validar que todos los datos existan
                if (!servicioId || !proveedorId) {
                    console.error('Error: Datos incompletos para el elemento en el carrito.', item);
                    return;
                }

                // Agregar al arreglo
                servicios.push({
                    servicioId,
                    proveedorId
                });
            });

            // Verificar si hay servicios para procesar
            if (servicios.length === 0) {
                alert('Por favor, asegúrese de haber agregado al menos un servicio al carrito.');
                return;
            }

            // Crear formulario y enviar los datos con POST
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '../pagos/pagos.php';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'servicios';
            input.value = JSON.stringify(servicios);
            form.appendChild(input);

            document.body.appendChild(form);
            form.submit();
        });
    }

    actualizarBotonPagar();
});

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
