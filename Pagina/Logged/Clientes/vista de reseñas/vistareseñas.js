document.getElementById('reseñaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const reseña = document.getElementById('reseña').value;
    const calificacion = document.getElementById('calificacion').value;
    const fecha = new Date().toLocaleDateString();

    // Crear un nuevo artículo de reseña
    const nuevaReseña = document.createElement('article');
    nuevaReseña.classList.add('reseña');

    const estrellas = '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);

    nuevaReseña.innerHTML = `
        <h3>${nombre} <span class="fecha">${fecha}</span></h3>
        <p>"${reseña}"</p>
        <div class="estrellas">${estrellas}</div>
    `;

    // Añadir la nueva reseña a la lista de reseñas
    document.querySelector('.lista-reseñas').appendChild(nuevaReseña);

    // Limpiar el formulario
    document.getElementById('reseñaForm').reset();
});
