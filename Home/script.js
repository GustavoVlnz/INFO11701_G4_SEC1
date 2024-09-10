document.addEventListener('DOMContentLoaded', () => {
    const discoverMoreBtn = document.getElementById('discover-more');
    const infoSection = document.getElementById('mas-info');

    discoverMoreBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace

        // Alterna la visibilidad de la sección
        if (infoSection.classList.contains('hidden')) {
            infoSection.classList.remove('hidden');
            infoSection.classList.add('visible');
            discoverMoreBtn.textContent = 'Ocultar Información'; // Cambia el texto del botón
        } else {
            infoSection.classList.remove('visible');
            infoSection.classList.add('hidden');
            discoverMoreBtn.textContent = 'Descubre Más'; // Cambia el texto del botón de vuelta
        }
    });
});
