document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los enlaces de las categorías
    const categoryLinks = document.querySelectorAll('.category a');

    // Añadir evento de clic para cada enlace
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevenir la acción por defecto

            // Obtener el href del enlace y el data-id del contenedor padre
            const categoryUrl = this.getAttribute('href');
            const dataId = this.closest('.col-md-6').getAttribute('data-id');

            // Redirigir a la URL con la id incluida como parámetro
            window.location.href = `${categoryUrl}?id=${dataId}`;
        });
    });
});
