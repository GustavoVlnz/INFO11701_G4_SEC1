// Espera a que el contenido del documento esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos del DOM que se usarán
    const DescubreMasBtn = document.getElementById('descubre-mas'); // Botón para mostrar/ocultar información
    const SeccionInfo = document.getElementById('mas-info'); // Sección de información que se muestra/oculta
    const SeccionServicio = document.getElementById('seccion-servicio'); // Sección del carrusel de servicios

    // Agrega un evento de clic al botón "Descubre Más"
    DescubreMasBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace (navegar a otro lugar)

        // Alterna la visibilidad de la sección de información y la sección de servicios
        if (SeccionInfo.classList.contains('hidden')) { // Si la sección de información está oculta
            SeccionInfo.classList.remove('hidden'); // Elimina la clase 'hidden'
            SeccionInfo.classList.add('visible'); // Añade la clase 'visible'
            SeccionServicio.classList.remove('hidden'); // Asegura que la sección de servicios esté visible
            DescubreMasBtn.textContent = 'Ocultar Información'; // Cambia el texto del botón a "Ocultar Información"
        } else { // Si la sección de información está visible
            SeccionInfo.classList.remove('visible'); // Elimina la clase 'visible'
            SeccionInfo.classList.add('hidden'); // Añade la clase 'hidden'
            SeccionServicio.classList.add('hidden'); // Oculta la sección de servicios
            DescubreMasBtn.textContent = 'Descubre Más'; // Cambia el texto del botón de vuelta a "Descubre Más"
        }
    });

    // Inicializa el índice de la diapositiva para la galeria de servicios
    let slideIndex = 0;
    showSlides(slideIndex); // Muestra la diapositiva inicial

    // Función para mostrar las diapositivas del carrusel
    function showSlides(n) {
        let slides = document.getElementsByClassName("slide"); // Obtiene todas las diapositivas
        if (n >= slides.length) { slideIndex = 0; } // Si el índice es mayor o igual al número de diapositivas, reinicia al inicio
        if (n < 0) { slideIndex = slides.length - 1; } // Si el índice es menor que 0, va a la última diapositiva
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Oculta todas las diapositivas
        }
        slides[slideIndex].style.display = "block"; // Muestra la diapositiva actual
    }

    // Función para mover las diapositivas del carrusel
    function moveSlide(n) {
        showSlides(slideIndex += n); // Actualiza el índice de la diapositiva y muestra la nueva diapositiva
    }

    // Exponer la función moveSlide a nivel global para los botones de navegación del carrusel
    window.moveSlide = moveSlide;
});

// Función para mostrar los datos del formulario en una alerta
function showAlertOnSubmit(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('telefono').value; 
    const selectElement = document.getElementById('options');
    const optionText = selectElement.options[selectElement.selectedIndex].text; // Obtener el texto de la opción seleccionada
    const message = document.getElementById('message').value;

    // Mostrar los datos en una alerta
    alert(`Nombres: ${name}\nApellidos: ${lastname}\nEmail: ${email}\nTelefono: ${phone}\nMotivo: ${optionText}\nMensaje: ${message}`);
}

// Asignar el evento submit del formulario a la función
document.getElementById('contactForm').addEventListener('submit', showAlertOnSubmit);

// Función para cambiar el color del botón al pasar el mouse sobre él
function changeButtonColorOnHover() {
    this.style.backgroundColor = 'royalblue';
}

// Función para restaurar el color original del botón al salir el mouse
function restoreButtonColor() {
    this.style.backgroundColor = '#333';
}

// Obtener el botón de envío del formulario y agregar los eventos
const submitButton = document.querySelector('#contactForm input[type="submit"]'); // Selector más específico

submitButton.addEventListener('mouseover', changeButtonColorOnHover);
submitButton.addEventListener('mouseout', restoreButtonColor);

// Funcionalidad seccion noticias leer mas
document.addEventListener('DOMContentLoaded', () => {
    const readMoreButtons = document.querySelectorAll('.btn-leer-mas');

    // Agrega un evento de clic a cada botón "Leer más"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace

            const moreInfo = button.closest('.noticias-post').querySelector('.masInfo'); // Selecciona la sección de más información correspondiente

            // Alterna la visibilidad de la sección de información adicional
            if (moreInfo.classList.contains('hidden')) {
                moreInfo.classList.remove('hidden'); // Muestra la información
                moreInfo.classList.add('visible'); // (opcional) añade clase visible si necesitas estilos específicos
                button.textContent = 'Ocultar'; // Cambia el texto del botón
            } else {
                moreInfo.classList.remove('visible'); // (opcional) quita clase visible si la usaste
                moreInfo.classList.add('hidden'); // Oculta la información
                button.textContent = 'Leer más'; // Cambia el texto del botón de vuelta
            }
        });
    });
});