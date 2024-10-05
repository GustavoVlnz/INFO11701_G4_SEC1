// Simulación de servicios disponibles para favoritos
const serviciosFavoritos = [
    { nombre: "Hosting Web", proveedor: "Proveedor Hosting Inc.", calificacion: 4.5, url: "https://detalles/hosting" },
    { nombre: "Consultoría SEO", proveedor: "SEO Experts", calificacion: 4.8, url: "https://detalles/seo" },
    { nombre: "Marketing Digital", proveedor: "Marketing Agency", calificacion: 4.3, url: "https://detalles/marketing" }
];

let favoritos = [];

// Filtra los servicios según lo que se escribe en la barra de búsqueda
function filterFavoriteServices() {
    const searchInput = document.getElementById('favorite-search').value.toLowerCase();
    const resultsContainer = document.getElementById('favorite-search-results');
    resultsContainer.innerHTML = '';

    const filteredServices = serviciosFavoritos.filter(service =>
        service.nombre.toLowerCase().includes(searchInput) ||
        service.proveedor.toLowerCase().includes(searchInput)
    );

    if (searchInput.length > 0) {
        filteredServices.forEach(service => {
            const li = document.createElement('li');
            li.textContent = `${service.nombre} - ${service.proveedor} - Calificación: ${service.calificacion}`;
            li.addEventListener('click', () => addServiceToFavorites(service));
            resultsContainer.appendChild(li);
        });
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.style.display = 'none';
    }
}

// Añadir servicio a la lista de favoritos
function addServiceToFavorites(service) {
    // Verificar si ya existe el servicio con el mismo nombre y proveedor
    const servicioExistente = favoritos.find(fav => fav.nombre === service.nombre && fav.proveedor === service.proveedor);

    if (servicioExistente) {
        alert('Este servicio ya ha sido agregado a favoritos.');
        return;
    }

    // Agregar el servicio a favoritos
    favoritos.push(service);
    renderFavorites();

    // Reiniciar la barra de búsqueda
    document.getElementById('favorite-search').value = '';
    document.getElementById('favorite-search-results').style.display = 'none';
}

// Renderiza la lista de favoritos
function renderFavorites() {
    const favoritosList = document.getElementById('lista-favoritos');
    favoritosList.innerHTML = '';
    
    favoritos.forEach(service => {
        const div = document.createElement('div');
        div.classList.add('servicio');
        
        const nombre = document.createElement('h3');
        nombre.textContent = service.nombre;

        const proveedor = document.createElement('p');
        proveedor.textContent = `Proveedor: ${service.proveedor}`;
        
        const calificacion = document.createElement('p');
        calificacion.textContent = `Calificación: ${service.calificacion} / 5`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add('eliminar-servicio');
        eliminarBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir que el clic también abra la página de detalles
            removeServiceFromFavorites(service);
        });

        div.addEventListener('click', () => window.location.href = service.url);

        div.appendChild(nombre);
        div.appendChild(proveedor);
        div.appendChild(calificacion);
        div.appendChild(eliminarBtn);

        favoritosList.appendChild(div);
    });

    document.getElementById('no-favorites-message').style.display = favoritos.length ? 'none' : 'block';
}

// Eliminar servicio de la lista de favoritos
function removeServiceFromFavorites(service) {
    favoritos = favoritos.filter(fav => fav !== service);
    renderFavorites();
}

// Filtrar favoritos por nombre o calificación
function filterFavorites() {
    const filterValue = document.getElementById('filter').value;

    if (filterValue === 'nombre') {
        favoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filterValue === 'calificacion') {
        favoritos.sort((a, b) => b.calificacion - a.calificacion);
    }

    renderFavorites();
}
