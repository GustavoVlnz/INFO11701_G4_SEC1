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
        li.textContent = `${servicio.nombre} - $${servicio.precio} CLP`;
        listaPedido.appendChild(li);
    });
}

// Función para confirmar el pedido (puede ser usada en un futuro)
function confirmarPedido() {
    if (serviciosAgregados.length > 0) {
        // Simular la confirmación del pedido
        alert('Pedido confirmado');
    } else {
        alert('No has agregado ningún servicio.');
    }
}
