document.addEventListener('DOMContentLoaded', function () {
    // Manejo del carrito
    const botonesAgregar = document.querySelectorAll('.agregar-carrito-btn');
    const listaCarrito = document.getElementById('lista-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    const botonPagar = document.getElementById('boton-pagar');
    const botonVolver = document.getElementById('boton-volver'); // Asegúrate de tener este botón definido en tu HTML
    const enlacesDetalle = document.querySelectorAll('[id^="detalle-pedido-"]');
    const botonesDetalles = document.querySelectorAll('.ver-detalles-btn');
    const serviciosEnCarrito = new Set(); // Set para limitar servicios únicos
    

    if (botonPagar && listaCarrito) {
        botonPagar.addEventListener('click', () => {
            const servicios = [];
            const carritoItems = listaCarrito.querySelectorAll('.list-group-item');

            carritoItems.forEach(item => {
                const servicioId = item.dataset.servicioId; // Obtener data-servicio-id del elemento
                const proveedorId = item.dataset.proveedorId; // Obtener data-proveedor-id del elemento

                // Validar que ambos valores existan
                if (!servicioId || !proveedorId) {
                    console.error('Error: servicioId o proveedorId no están definidos para el elemento en el carrito.', item);
                    return;
                }

                // Agregar al arreglo
                servicios.push({ servicioId, proveedorId });
            });

            // Verificar si hay servicios para procesar
            if (servicios.length === 0) {
                alert('Por favor, asegúrese de haber agregado al menos un servicio al carrito.');
                return;
            }

            // Crear un formulario y enviar los datos con POST
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
    botonesDetalles.forEach(boton => {
        boton.addEventListener('click', function () {
            const cardBody = boton.closest('.card-body');
            const selectProveedor = cardBody.querySelector('.form-select');
            const nuevoProveedorId = selectProveedor.value;

            // Validar si se ha seleccionado un proveedor
            if (!nuevoProveedorId || nuevoProveedorId === 'Seleccione un proveedor') {
                alert('Por favor, seleccione un proveedor antes de ver los detalles.');
                return;
            }

            // Construcción del enlace utilizando categoriaId
            if (categoriaId !== 0) {
                const enlace = `../detalle_pedido/detalle.php?proveedor_id=${nuevoProveedorId}&id_categoria=${categoriaId}`;
                window.location.href = enlace;
            } else {
                console.error('El ID de la categoría no es válido.');
            };
        });
    });

    if (!botonesAgregar || !listaCarrito || !carritoVacio || !botonPagar || !botonVolver || !enlacesDetalle) {
        console.error('Algunos elementos clave no están definidos. Verifique su HTML.');
        return;
    }
    enlacesDetalle.forEach(enlace => {
        enlace.addEventListener('click', function (event) {
            const cardBody = enlace.closest('.card-body');
            const selectProveedor = cardBody.querySelector('.form-select');
            
            // Validar si se ha seleccionado un proveedor
            if (!selectProveedor || selectProveedor.value === 'Seleccione un proveedor') {
                event.preventDefault();
                alert('Debe seleccionar un proveedor antes de ver los detalles del pedido.');
            } 
        });
    });

    // Función para actualizar la visibilidad del botón "Pagar" y animar
    function actualizarBotonPagar() {
        if (listaCarrito.children.length > 0) {
            botonPagar.style.display = 'inline-block';
            botonVolver.style.display = 'inline-block';
            aplicarAnimacionBotones();
        } else {
            botonPagar.style.display = 'none';
            botonVolver.style.display = 'none';
        }
    }

    // Función para aplicar animación a los botones "Pagar" y "Volver"
    function aplicarAnimacionBotones() {
        // Remover animación previa si existe para reiniciarla
        botonPagar.classList.remove('animate-add');
        botonVolver.classList.remove('animate-add');

        // Forzar reflujo para reiniciar la animación
        void botonPagar.offsetWidth;
        void botonVolver.offsetWidth;

        // Añadir clase de animación
        botonPagar.classList.add('animate-add');
        botonVolver.classList.add('animate-add');
    }

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const servicioId = this.dataset.id;
            const nombre_servicio = this.dataset.nombre;

            // Limitar a un servicio por tipo
            if (serviciosEnCarrito.has(servicioId)) {
                alert(`El servicio "${nombre_servicio}" ya está en el carrito.`);
                return;
            }

            const cardBody = this.closest('.card-body');
            const selectProveedor = cardBody.querySelector('.form-select');

            // Validar si se ha seleccionado un proveedor
            if (!selectProveedor || selectProveedor.value === '' || selectProveedor.value === 'Seleccione un proveedor') {
                alert('Por favor, seleccione un proveedor antes de agregar el servicio al carrito.');
                return;
            }

            // Capturar el id_proveedor del valor seleccionado
            const proveedorId = selectProveedor.value; // Obtener el id del proveedor del valor del select
            const proveedorSeleccionado = selectProveedor.options[selectProveedor.selectedIndex].text;
            const [proveedorNombre, proveedorPrecio] = proveedorSeleccionado.split(' - $');

            // Crear una constante para almacenar el id_proveedor
            const idProveedorConstante = proveedorId;

            // Crear elemento de lista para el carrito
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.dataset.servicioId = servicioId; // Agregar data-servicio-id para identificar el servicio
            li.dataset.proveedorId = idProveedorConstante; // Agregar data-proveedor-id para identificar el proveedor
            li.textContent = `Servicio: ${nombre_servicio}, Proveedor: ${proveedorNombre}, Precio: $${proveedorPrecio}`;
            serviciosEnCarrito.add(servicioId); // Añadir servicio al Set para evitar duplicados

            // Botón para eliminar del carrito
            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'btn btn-danger btn-sm';
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', function () {
                li.classList.add('animate-remove');

                li.addEventListener('animationend', function () {
                    li.remove();
                    serviciosEnCarrito.delete(servicioId); // Eliminar del Set
                    if (listaCarrito.children.length === 0) {
                        carritoVacio.style.display = 'block';
                    }
                    actualizarBotonPagar();
                }, { once: true });
            });

            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);

            void li.offsetWidth; // Forzar reflujo para asegurar la aplicación de la animación
            li.classList.add('animate-add');

            carritoVacio.style.display = 'none';
            actualizarBotonPagar();
        });
    });
});