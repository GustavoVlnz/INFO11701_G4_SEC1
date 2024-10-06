document.querySelectorAll('.ver-detalles').forEach(boton => {
    boton.addEventListener('click', function() {
        const descripcion = this.parentElement.querySelector('.descripcion');
        
        // Alternar la visibilidad de la descripción
        if (descripcion.style.display === 'none') {
            descripcion.style.display = 'block';  // Muestra la descripción
            this.textContent = 'Ocultar Detalles'; // Cambia el texto del botón
        } else {
            descripcion.style.display = 'none';   // Oculta la descripción
            this.textContent = 'Ver Detalles';    // Cambia el texto del botón
        }
    });
});
