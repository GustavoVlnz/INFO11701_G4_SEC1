// Función para agregar un servicio a la lista de pedidos
function agregarServicio(nombre, precio) {
    const listaPedido = JSON.parse(localStorage.getItem('pedido')) || []; // Obtener la lista del localStorage

    // Verificar si el servicio ya está en la lista
    const servicioExistente = listaPedido.find(servicio => servicio.nombre === nombre);
    
    if (servicioExistente) {
        alert('Este servicio ya ha sido agregado a tu pedido.');
        return; // No agregar si ya existe
    }

    listaPedido.push({ nombre, precio }); // Agregar el nuevo servicio
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
        li.textContent = `${servicio.nombre} - $${servicio.precio}`;
        
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
