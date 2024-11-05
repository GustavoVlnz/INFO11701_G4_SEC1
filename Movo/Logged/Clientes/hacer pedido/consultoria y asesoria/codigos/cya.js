// Array para almacenar los servicios agregados
let serviciosAgregados = [];

// Función para agregar un servicio al pedido
function agregarServicio(nombre, precio) {
    const servicio = {
        nombre: nombre,
        precio: precio
    };

    // Verificar si el servicio ya fue agregado
    const existe = serviciosAgregados.find(s => s.nombre === nombre);
    if (!existe) {
        serviciosAgregados.push(servicio);
        actualizarListaPedido();
    } else {
        alert("Este servicio ya está en tu pedido.");
    }
}

// Función para actualizar la lista de servicios en el pedido
function actualizarListaPedido() {
    const listaPedido = document.getElementById('lista-pedido');
    listaPedido.innerHTML = '';

    serviciosAgregados.forEach(servicio => {
        const li = document.createElement('li');
        li.textContent = `${servicio.nombre} - $${servicio.precio.toLocaleString()} CLP`;

        // Botón para eliminar el servicio del pedido
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarServicio(servicio.nombre);

        li.appendChild(btnEliminar);
        listaPedido.appendChild(li);
    });
}

// Función para eliminar un servicio del pedido
function eliminarServicio(nombre) {
    serviciosAgregados = serviciosAgregados.filter(servicio => servicio.nombre !== nombre);
    actualizarListaPedido();
}

// Función para confirmar el pedido (puede ser usada en un futuro)
function confirmarPedido() {
    if (serviciosAgregados.length > 0) {
        // Simular la confirmación del pedido
        alert('Pedido confirmado');
        // Aquí podrías redirigir a una página de confirmación o enviar los datos al servidor
    } else {
        alert('No has agregado ningún servicio.');
    }
}
