document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        'Carpintería',
        'Electricidad',
        'Fontanería',
        'Jardinería',
        'Pintura',
        'Plomería',
        'Reparación de electrodomésticos',
    ];

    // Ordenar categorías alfabéticamente
    categories.sort();

    const categoryList = document.getElementById('Lista_categoria');

    // Crear botones para cada categoría
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.textContent = category;
        categoryDiv.addEventListener('click', () => {
            window.location.href = `hacerpedidos.html?category=${encodeURIComponent(category)}`;
        });
        categoryList.appendChild(categoryDiv);
    });
});
