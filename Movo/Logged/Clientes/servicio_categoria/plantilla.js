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
