document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los enlaces de las categorías
    const categoryLinks = document.querySelectorAll('.category a');

    // Añadir evento de clic para cada enlace
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevenir la acción por defecto
            const categoryUrl = this.getAttribute('href');  // Obtener el href del enlace
            window.location.href = categoryUrl;  // Redirigir a la URL
        });
    });
});
