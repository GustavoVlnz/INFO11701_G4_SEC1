document.addEventListener('DOMContentLoaded', function() {
    const botonAgregar = document.querySelector('.boton-agregar');
    const botonesEliminar = document.querySelectorAll('.boton-eliminar');
    const botonesEditar = document.querySelectorAll('.boton-editar');

    const formAgregar = document.getElementById('form-agregar');
    const formEliminar = document.getElementById('form-eliminar');
    const formEditar = document.getElementById('form-editar');

    const botonesCerrar = document.querySelectorAll('.boton-cerrar');

    // Mostrar formulario de agregar
    botonAgregar.addEventListener('click', () => {
        formAgregar.style.display = 'block';
    });

    // Mostrar formulario de eliminar
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            formEliminar.style.display = 'block';
        });
    });

    // Mostrar formulario de editar y rellenar con datos del servicio seleccionado
    botonesEditar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const servicio = boton.parentElement;
            const nombreServicio = servicio.querySelector('h3').textContent;
            const descripcionServicio = servicio.querySelector('p').textContent;
            const precioServicio = servicio.querySelector('p:nth-of-type(2)').textContent.replace('Precio: $', '').replace(' CLP', '');

            // Llenar el formulario de edición
            document.getElementById('editar-nombre-servicio').value = nombreServicio;
            document.getElementById('editar-descripcion-servicio').value = descripcionServicio;
            document.getElementById('editar-precio-servicio').value = precioServicio;

            formEditar.style.display = 'block';
        });
    });

    // Función para cerrar formularios
    botonesCerrar.forEach((boton) => {
        boton.addEventListener('click', () => {
            formAgregar.style.display = 'none';
            formEliminar.style.display = 'none';
            formEditar.style.display = 'none';
        });
    });
});
