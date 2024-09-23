document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        { name: 'Hogar y Reparaciones', img: '../images/hogar.png' },
        { name: 'Eventos y Entretenimiento', img: '../images/calendario.jpg' },
        { name: 'Fotografía y Videografía', img: '../images/camara.png' },
        { name: 'Tecnología y Desarrollo', img: '../images/tecnologia.png' },
        { name: 'Salud y Bienestar', img: '../images/salud.png' },
        { name: 'Limpieza y Mantenimiento', img: '../images/limpieza.png' },
        { name: 'Transporte y Mudanza', img: '../images/transporte.png' },
        { name: 'Consultoría y Asesoría', img: '../images/consultoria.png' },
    ];

    // Ordenar categorías alfabéticamente por nombre
    categories.sort((a, b) => a.name.localeCompare(b.name));

    const categoryList = document.getElementById('Lista_categoria');

    // Crear botones para cada categoría con imagen y texto
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const categoryImg = document.createElement('img');
        categoryImg.src = category.img;
        categoryImg.alt = category.name;

        const categoryText = document.createElement('span');
        categoryText.textContent = category.name;

        categoryDiv.appendChild(categoryImg);
        categoryDiv.appendChild(categoryText);

        categoryDiv.addEventListener('click', () => {
            window.location.href = `hacerpedidos.html?category=${encodeURIComponent(category.name)}`;
        });

        categoryList.appendChild(categoryDiv);
    });
});
