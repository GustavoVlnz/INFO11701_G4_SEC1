document.addEventListener('DOMContentLoaded', () => {
    // se obtiene el contenedor del carrito de servicios
    const listaCarrito = document.getElementById('lista-carrito');

    // esta funcion agrega un servicio al carrito
    function agregarServicio(nombre, imagen) {
        // se crea un nuevo contenedor para el servicio
        const item = document.createElement('div');
        item.classList.add('item-carrito');
        
        // se crea un elemento de imagen para el servicio
        const img = document.createElement('img');
        img.src = imagen;
        img.alt = nombre;
        img.classList.add('imagen-item');

        // se crea un elemento de texto para el nombre del servicio
        const nombreServicio = document.createElement('span');
        nombreServicio.textContent = nombre;

        // se crea un boton para eliminar el servicio del carrito
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('eliminar-servicio');
        eliminarBtn.addEventListener('click', () => {
            // cuando se hace clic en el boton, elimina el servicio del carrito
            listaCarrito.removeChild(item);
        });

        // esta seccion añade la imagen, el nombre y el boton al contenedor del servicio
        item.appendChild(img);
        item.appendChild(nombreServicio);
        item.appendChild(eliminarBtn);

        // aqui se añade el nuevo servicio al carrito
        listaCarrito.appendChild(item);
    }

    // aqui se agrega un evento a cada boton de agregar servicio
    document.querySelectorAll('.agregar-servicio').forEach(btn => {
        btn.addEventListener('click', (event) => {
            // Encuentra el elemento del servicio correspondiente
            const servicioElement = event.target.closest('.categoria-servicio');
            const nombre = servicioElement.querySelector('.info-servicio span').textContent;
            const imagen = servicioElement.querySelector('img').src;
            
            // y finalmente se lama a la funcion para agregar el servicio al carrito
            agregarServicio(nombre, imagen);
        });
    });
});
