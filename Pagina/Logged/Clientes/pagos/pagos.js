document.addEventListener('DOMContentLoaded', function () {
    const botonPagar = document.getElementById('botonPagar');
    const metodosPago = document.getElementById('metodosPago');
    const mostrarFormulario = document.getElementById('mostrarFormulario');
    const formularioPago = document.getElementById('formularioPago');
    const confirmarPago = document.getElementById('confirmarPago');
    const serviciosDetalles = document.getElementById('serviciosDetalles').textContent;
    console.log('Contenido JSON recibido:', serviciosDetalles);
    let servicios = JSON.parse(serviciosDetalles); // Aquí puede haber un problema si el JSON no es válido

    // Verificar los datos cargados
    console.log('Servicios cargados:', servicios);

    if (confirmarPago) {
        confirmarPago.addEventListener('click', () => {
            // Crear un formulario para enviar los datos a proceso_pago.php
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'proceso_pago.php'; // Ajusta la ruta si es necesario

            // Agregar los datos de los servicios al formulario como un campo oculto
            const serviciosInput = document.createElement('input');
            serviciosInput.type = 'hidden';
            serviciosInput.name = 'servicios';
            serviciosInput.value = JSON.stringify(servicios); // Convertir el arreglo a JSON
            form.appendChild(serviciosInput);

            // Agregar el formulario al cuerpo y enviarlo
            document.body.appendChild(form);
            form.submit();
        });
    }
    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            metodosPago.classList.remove('d-none');
            metodosPago.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (mostrarFormulario) {
        mostrarFormulario.addEventListener('click', () => {
            formularioPago.classList.remove('d-none');
            formularioPago.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
