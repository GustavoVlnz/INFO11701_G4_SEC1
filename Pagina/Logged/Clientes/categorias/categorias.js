document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los enlaces de las categorías
    const categoryLinks = document.querySelectorAll('.category a');

    // Añadir evento de clic para cada enlace
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevenir la acción por defecto
<<<<<<< HEAD
            const categoryUrl = this.getAttribute('href');  // Obtener el href del enlace
            window.location.href = categoryUrl;  // Redirigir a la URL
=======
            const categoryDiv = this.closest('.category');  // Obtener el contenedor padre
            const categoryId = categoryDiv.dataset.id;  // Obtener la ID de la categoría

            // Construir la URL con la ID como parámetro
            const currentUrl = this.getAttribute('href');
            const newUrl = `${currentUrl}?id=${categoryId}`;
            window.location.href = newUrl;  // Redirigir a la nueva URL con la ID incluida
>>>>>>> Alex
        });
    });
});
