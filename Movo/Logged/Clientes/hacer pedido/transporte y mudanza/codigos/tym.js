// Función para agregar un proveedor a la lista de pedidos
function agregarProveedor(servicioNombre, selectElement) {
    const listaPedido = JSON.parse(localStorage.getItem('pedido')) || [];
    const proveedorSeleccionado = selectElement.options[selectElement.selectedIndex].text;
    const precio = parseFloat(proveedorSeleccionado.split('- $')[1].replace(' CLP', '')); // Obtener el precio del proveedor

    // Verificar si el servicio ya está en la lista
    const servicioExistente = listaPedido.find(servicio => servicio.nombre === servicioNombre);
    
    if (servicioExistente) {
        // Si el servicio ya existe, actualizar con el nuevo proveedor
        servicioExistente.proveedor = proveedorSeleccionado;
        servicioExistente.precio = precio;
    } else {
        // Si el servicio no existe, agregarlo a la lista con el proveedor seleccionado
        listaPedido.push({ nombre: servicioNombre, proveedor: proveedorSeleccionado, precio });
    }

    localStorage.setItem('pedido', JSON.stringify(listaPedido)); // Guardar la lista actualizada
    mostrarPedido(); // Mostrar la lista actualizada en la página
}

// Función para mostrar la lista de pedidos en la interfaz
function mostrarPedido() {
    const listaPedido = JSON.parse(localStorage.getItem('pedido')) || [];
    const listaElement = document.getElementById('lista-pedido');
    listaElement.innerHTML = ''; // Limpiar la lista actual

    listaPedido.forEach((servicio, index) => {
        const li = document.createElement('li');
        li.textContent = `${servicio.nombre} (${servicio.proveedor})`;
        
        // Crear un botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarServicio(index); // Asignar función de eliminar

        li.appendChild(btnEliminar); // Agregar botón a la lista
        listaElement.appendChild(li); // Agregar el elemento a la lista
    });
}

// Función para eliminar un servicio de la lista
function eliminarServicio(index) {
    const listaPedido = JSON.parse(localStorage.getItem('pedido')) || [];
    listaPedido.splice(index, 1); // Eliminar el servicio del índice indicado
    localStorage.setItem('pedido', JSON.stringify(listaPedido)); // Guardar la lista actualizada
    mostrarPedido(); // Mostrar la lista actualizada en la página
}

// Al cargar la página, mostrar los servicios guardados
document.addEventListener('DOMContentLoaded', mostrarPedido);

// Detectar cambios en los selects y agregar los proveedores seleccionados
document.querySelectorAll('.ver-proveedor').forEach(selectElement => {
    selectElement.addEventListener('change', function() {
        const servicioNombre = this.parentElement.querySelector('h3').textContent;
        agregarProveedor(servicioNombre, this);
    });
});
